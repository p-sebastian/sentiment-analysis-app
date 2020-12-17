import {IonRouterOutlet} from '@ionic/react'
import React from 'react'
import {Route} from 'react-router'

import {DashboardPage} from './Dashboard/Dashboard.page'
import {MainRouteNames} from './Route.names'

export const MainRouter: React.FC = () => {
  return (
    <IonRouterOutlet>
      <Route path={MainRouteNames.Dashboard} component={DashboardPage} />
    </IonRouterOutlet>
  )
}
