import { onError } from '@apollo/client/link/error'

/* eslint-disable no-console */
export default function errorLink() {
  return onError(({ graphQLErrors, networkError }) => {
    if (networkError) console.error(`[Network error]: ${networkError}`)

    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, location, path }) => {
        if (message === 'PersistedQueryNotFound') return

        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`,
        )
      })
    }
  })
}
