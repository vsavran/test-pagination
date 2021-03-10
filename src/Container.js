import React, { useEffect, useMemo } from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'

import { Normalize } from 'styled-normalize'

import { ApolloProvider } from '@apollo/client'

import { createApolloClient } from 'Services/Apollo'

import router from './Router'

const client = createApolloClient()

export default function Container() {
  const routes = useMemo(() => router(), [])

  useEffect(() => {
    document.title = 'StartupCraft Test'
  })

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Normalize />
        {renderRoutes(routes)}
      </BrowserRouter>
    </ApolloProvider>
  )
}
