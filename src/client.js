import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import { hydrateRoot } from 'react-dom/client'

hydrateRoot(
  document.querySelector('#root'),
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
)
