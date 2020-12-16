import React from 'react'
import {Redirect, Route, RouteProps} from 'react-router'

import {AuthRouteNames} from '../pages/Route.names'
import {AuthStateEnum} from '../redux/slices/auth.slice'
import {useASelector} from '../utils/recipies.util'

export const PrivateRoute: React.FC<RouteProps> = ({component: Component, ...rest}) => {
  const status = useASelector(state => state.auth.status)
  const authenticated = status === AuthStateEnum.SignedIn
  return (
    <Route
      {...rest}
      render={props =>
        authenticated && Component ? (
          <Component {...props} />
        ) : (
          <Redirect to={{pathname: AuthRouteNames.Login, state: {from: props.location}}} />
        )
      }
    />
  )
}
