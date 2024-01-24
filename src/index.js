import React from 'react'
import { createRoot } from 'react-dom/client' // Importando createRoot
import { ToastContainer } from 'react-toastify'

import AppProvider from './hooks'
import Routes from './routes/routes'
import GlobalStyles from './styles/globalStyles'
// Utilizando createRoot em vez de ReactDOM.render
createRoot(document.getElementById('root')).render(
  <>
    <AppProvider>
      <Routes />
    </AppProvider>
    <ToastContainer autoClose={2000} />
    <GlobalStyles />
  </>
)
