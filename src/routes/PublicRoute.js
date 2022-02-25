import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isLoggedIn } from '../utils/utils'

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn() && restricted ? (
          <Redirect to="/admin" />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PublicRoute
