import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import Routes from './routes'

const express = require('express')
const app = express()
const port = process.env.PROT || 3000

app.use(express.static('dist/public'))

app.get('*', (req, res) => {
  const content = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <Routes />
    </StaticRouter>
  )

  const html = `
  <html>
    <head>
    </head>
    <body>
      <div id="root">${content}</div>
      <script src="bundle_client.js"></script>
    </body>
  </html>
`

  res.writeHead(200, {
    'content-type': 'text/html;charset=utf-8',
  })
  res.end(html)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
