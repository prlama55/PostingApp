import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import NavBar from './core/nav-bar'
import { Routes } from './Routes'
import { setAppCredential } from '../config/accessToken'
const App: React.FC = () => {
  useEffect(() => {
      if(localStorage.getItem('user')){
          // @ts-ignore
          let userCredential= JSON.parse(localStorage.getItem('user').toString())
          setAppCredential(userCredential)
      }

  }, [])
console.log("env=====", process.env.BASE_API)
  return (
    <BrowserRouter>
      <Route path="/" render={props => <NavBar {...props} />} />
      <Routes />
    </BrowserRouter>
  )
}

export default App
