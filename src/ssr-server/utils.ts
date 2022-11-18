import { ViteDevServer } from 'vite'
import path from 'path'
import fs from 'fs'

export const isProd = process.env.NODE_ENV === 'production'
export const cwd = process.cwd()

export async function loadSsrEntryModule(vite: ViteDevServer | null) {
  // 生产模式下直接 require 打包后的产物
  if (isProd) {
    const entryPath = path.join(cwd, 'dist/server/entry-server.js')
    return require(entryPath)
  }
  // 开发环境下通过 no-bundle 方式加载
  else {
    const entryPath = path.join(cwd, 'src/entry-server.tsx')
    return vite!.ssrLoadModule(entryPath)
  }
}

export function resolveTemplatePath() {
  return isProd
    ? path.join(cwd, 'dist/client/index.html')
    : path.join(cwd, 'index.html')
}

export function matchPageUrl(url: string) {
  if (url === '/') {
    return true
  }
}
