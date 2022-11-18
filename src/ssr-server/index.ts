import express, { RequestHandler, Express } from 'express'
import { ViteDevServer } from 'vite'
import { loadSsrEntryModule, matchPageUrl, resolveTemplatePath } from './utils'
import { renderToString } from 'react-dom/server'
import React from 'react'
import fs from 'fs'
import serve from 'serve-static'
import path from 'path'

const isProd = process.env.NODE_ENV === 'production'
const cwd = process.cwd()

async function createSsrMiddleware(app: Express): Promise<RequestHandler> {
  let vite: ViteDevServer | null = null
  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root: process.cwd(),
      server: {
        middlewareMode: 'ssr',
      },
    })
    // 注册 Vite Middlewares
    // 主要用来处理客户端资源
    app.use(vite.middlewares)
  }
  return async (req, res, next) => {
    // SSR 的逻辑
    const url = req.originalUrl
    if (!matchPageUrl(url)) {
      return await next()
    }
    // 1. 加载服务端入口模块
    const { ServerEntry, fetchData } = await loadSsrEntryModule(vite)
    // 2. 数据预取
    const data = await fetchData()
    // 3. 「核心」渲染组件 -> 字符串
    const appHtml = renderToString(React.createElement(ServerEntry, { data }))
    console.log(appHtml)

    // 4. 拼接 HTML，返回客户端
    const templatePath = resolveTemplatePath()
    let template = await fs.readFileSync(templatePath, 'utf-8')
    // 开发模式下需要注入 HMR、环境变量相关的代码，因此需要调用 vite.transformIndexHtml
    if (!isProd && vite) {
      template = await vite.transformIndexHtml(url, template)
    }
    const html = template
      .replace('<!-- SSR_APP -->', appHtml)
      // 注入数据标签，用于客户端 hydrate
      .replace(
        '<!-- SSR_DATA -->',
        `<script>window.__SSR_DATA__=${JSON.stringify(data)}</script>`
      )

    res.status(200).setHeader('Content-Type', 'text/html').end(html)
  }
}

async function createServer() {
  const app = express()
  // 加入 Vite SSR 中间件
  app.use(await createSsrMiddleware(app))

  // 生产环境端处理客户端资源
  if (isProd) {
    app.use(serve(path.join(cwd, 'dist/client')))
  }

  app.listen(3000, () => {
    console.log('Node 服务器已启动~')
    console.log('http://localhost:3000')
  })
}

createServer()
