import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import NavBar from './core/nav-bar'
import { Routes } from './Routes'
import { setAppCredential } from '../config/accessToken'
import { BASE_API } from '../config/config'
const App: React.FC = () => {
  useEffect(() => {
    fetch(`${BASE_API}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    }).then(async token => {
      const credential = await token.json()
      if(credential.success) setAppCredential(credential)
    })
  }, [])

  return (
    <BrowserRouter>
      <Route path="/" render={props => <NavBar {...props} />} />
      <Routes />
    </BrowserRouter>
  )
}

export default App
