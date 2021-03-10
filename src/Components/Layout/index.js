import React from 'react'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'

import Ticker from '../Ticker'

function Layout({ route }) {
  return (
    <>
      <Ticker />
      {renderRoutes(route.routes)}
    </>
  )
}

Layout.propTypes = {
  route: PropTypes.object.isRequired,
}

export default Layout
