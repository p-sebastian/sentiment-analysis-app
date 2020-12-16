import {IonRouterOutlet} from '@ionic/react'
import React from 'react'

import {PrivateRoute} from '../components/PrivateRoute.component'
import {DashboardPage} from './Dashboard/Dashboard.page'
import {MainRouteNames} from './Route.names'

export const MainRouter: React.FC = () => {
  return (
    <IonRouterOutlet>
      <PrivateRoute path={MainRouteNames.Dashboard} component={DashboardPage} />
    </IonRouterOutlet>
  )
}
