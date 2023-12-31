import React from 'react'
import { createRoot } from 'react-dom' // Importando createRoot
import { ToastContainer } from 'react-toastify'

import Login from './containers/Login'
import Register from './containers/Register'
import { UserProvider } from './hooks/UserContext'
import GlobalStyles from './styles/globalStyles'
// Utilizando createRoot em vez de ReactDOM.render
createRoot(document.getElementById('root')).render(
  <>
    <UserProvider>
      <Login />
    </UserProvider>
    <ToastContainer autoClose={2000} />
    <GlobalStyles />
  </>
)
