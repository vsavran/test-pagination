import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'

import { errorLink, httpLink } from './Links'

function createApolloClient() {
  const cache = new InMemoryCache()

  const links = [errorLink(), httpLink()]

  const clientOptions = {
    link: ApolloLink.from(links),
    connectDevTools: true,
    cache,
  }

  return new ApolloClient(clientOptions)
}

export { createApolloClient }
