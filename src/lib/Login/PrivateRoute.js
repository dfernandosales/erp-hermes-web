import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { Consumer } from './Auth'

const PrivateRoute = ({
  component: Component,
  render,
  loginPath = '/login',
  ...props
}) => (
  <Consumer>
    {({ loggedin, redirectPath }) => {
      const path = redirectPath
        ? `${loginPath}?redirectPath=${redirectPath}`
        : loginPath
      return (
        <Route
          exact
          {...props}
          render={props =>
            loggedin ? (
              Component ? (
                <Component />
              ) : (
                render(props)
              )
            ) : (
              <Redirect to={path} />
            )}
        />
      )
    }}
  </Consumer>
)

PrivateRoute.propTypes = {
  loginPath: PropTypes.string,
  loggedin: PropTypes.bool
}

export default PrivateRoute
