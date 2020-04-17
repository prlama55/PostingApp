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
import { BASE_API } from './config/config'

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

const client = new ApolloClient({
  link: ApolloLink.from([
    new TokenRefreshLink({
      accessTokenField: 'accessToken',
      isTokenValidOrUndefined: () => {
        const token = getAppCredential()
        if (!token.accessToken) return true
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
        return fetch(`${BASE_API}/refresh_token`, {
          method: 'POST',
          credentials: 'include',
        })
      },
      handleFetch: accessToken => {
        const getToken = getAppCredential()
        setAppCredential({
          ...getToken,
          accessToken: accessToken,
        })
      },
      handleError: err => {
        console.warn('Your refresh token is invalid. Try to again')
        console.error(err)
        setAppCredential({
          id: '',
          accessToken: '',
          email: '',
          role: '',
          name: '',
          hasBusiness: false,
        })
        localStorage.removeItem('user')
      },
    }),
    onError(({ graphQLErrors, networkError }) => {
      console.log(graphQLErrors)
      console.log(networkError)
      window.location.href='/error'+`/${networkError}/${graphQLErrors}`
    }),
    requestLink,
    new HttpLink({
      uri: `${BASE_API}/graphql`,
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
  document.querySelector('#root')
)
