import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import { Provider } from 'react-redux'
import { hydrateRoot } from 'react-dom/client'
import createStoreInstance from './store'

const store = createStoreInstance(window?.__PRELOAD_STATE__)

hydrateRoot(
  document.querySelector('#root'),
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
)
