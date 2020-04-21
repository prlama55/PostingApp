import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import App from './components/App'
import theme from './components/core'
import { ApolloProvider } from '@apollo/react-hooks'
import {
  getAppCredential,
  setAppCredential,
} from './config/accessToken'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink, Observable } from 'apollo-link'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import jwtDecode from 'jwt-decode'
import { REACT_APP_BASE_API } from './config/config'
import * as dotenv from 'dotenv'
dotenv.config()
const cache = new InMemoryCache({})

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any
      Promise.resolve(operation)
        .then(operation => {
          // @ts-ignore
          let userCredential= localStorage.getItem('user')?JSON.parse(localStorage.getItem('user').toString()):  getAppCredential()
          if (userCredential.accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${userCredential.accessToken}`,
              },
            })
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)
const $appRoot=document.querySelector('#root')
const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: 'accessToken',
      isTokenValidOrUndefined: () => {
        // @ts-ignore
        let token= localStorage.getItem('user')?JSON.parse(localStorage.getItem('user').toString()):  getAppCredential()
        if (!token.accessToken) {
          localStorage.removeItem('user')
          return true
        }
        try {
          const { exp } = jwtDecode(token.accessToken)
          if (Date.now() >= exp * 1000) {
            return false
          } else {
            return true
          }
        } catch {
          return false
        }
      },
      fetchAccessToken: () => {
        return fetch(`${REACT_APP_BASE_API}/refresh_token`, {
          method: 'POST',
          credentials: 'include',
        })
      },
      handleFetch: accessToken => {
        // @ts-ignore
        let getToken= localStorage.getItem('user')?JSON.parse(localStorage.getItem('user').toString()):  getAppCredential()
        setAppCredential({
          ...getToken,
          accessToken: accessToken,
        })
      },
      handleError: err => {
        console.warn('Your refresh token is invalid. Try to again')
        console.error("err====",err)
        setAppCredential({
          id: '',
          accessToken: '',
          email: '',
          role: '',
          name: '',
          businessUserId: '',
          hasBusiness: false,
        })
        localStorage.removeItem('user')
      },
    }),
    onError((errors) => {
      const {graphQLErrors, networkError}= errors
      console.log(graphQLErrors)
      console.log(networkError)
      let message=''
      let path
      if(graphQLErrors!==undefined) {
        message= graphQLErrors[0].message
        // @ts-ignore
        if(graphQLErrors[0].path.length>0)path=graphQLErrors[0].path[0]
      }
      if(networkError!==undefined) message= "Network Error! Please try again"
      console.log(message)
      console.log(path)
      let redirectUrl='/'
      if (path==='login') {
        localStorage.removeItem('user')
          redirectUrl=`/login/?error=${message}`
      }else if(message==='Not authorized!'){
        localStorage.removeItem('user')
        redirectUrl=`/login/?error=${message} Please login to continue`
      }else{
        redirectUrl=`/error/?errorMessage=${message}`
      }
      window.location.href=redirectUrl
    }),
    requestLink,
    new HttpLink({
      uri: `${REACT_APP_BASE_API}/graphql`,
      credentials: 'include',
    }),
  ]),
  cache,
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ThemeProvider>,
    $appRoot
)
