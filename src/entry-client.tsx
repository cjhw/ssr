import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { fetchData } from './entry-server'
import './index.css'

// @ts-ignore
const data = window.__SSR_DATA__ ?? fetchData()

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <App data={data} />
  </React.StrictMode>
)
