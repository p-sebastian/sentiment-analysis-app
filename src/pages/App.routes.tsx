import {IonRouterOutlet} from '@ionic/react'
import React, {useEffect} from 'react'
import {Redirect, Route, Switch, useHistory} from 'react-router'

import {useAuthAction} from '../hooks/useAction.hook'
import {useASelector} from '../utils/recipies.util'
import {MainRouter} from './Main.routes'
import {AppRouteNames, MainRouteNames} from './Route.names'

export const AppRouter: React.FC = () => {
  const {} = useInit()

  return (
    <IonRouterOutlet id="rotary-app">
      <Switch>
        <Route path={AppRouteNames.Main} component={MainRouter} />
        <Route exact path="/" render={() => <Redirect to={MainRouteNames.Dashboard} />} />
      </Switch>
    </IonRouterOutlet>
  )
}

const useInit = () => {
  const launched = useAuthAction('appLaunched')
  const history = useHistory()
  const status = useASelector(state => state.auth.status)

  useEffect(() => {
    launched()
  }, [])

  useEffect(() => {
    history.push(MainRouteNames.Dashboard)
  }, [status])

  return {}
}
