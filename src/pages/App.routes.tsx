import {menuController} from '@ionic/core'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import {logOutOutline, ticketOutline} from 'ionicons/icons'
import React, {useCallback, useEffect} from 'react'
import {Redirect, Route, Switch, useHistory} from 'react-router'

import {useAuthAction} from '../hooks/useAction.hook'
import {AuthStateEnum} from '../redux/slices/auth.slice'
import {useASelector} from '../utils/recipies.util'
import {MainRouter} from './Main.routes'
import {AppRouteNames, AuthRouteNames, MainRouteNames} from './Route.names'

export const AppRouter: React.FC = () => {
  const {onLogout, onTicket} = useInit()

  return (
    <>
      <IonMenu side="start" menuId="first" contentId="rotary-app" swipeGesture={false}>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Cine UEES</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent color="tertiary">
          <IonList color="tertiary" className="ion-no-padding">
            <IonItem button detail color="background" onClick={onTicket}>
              <IonIcon icon={ticketOutline} slot="start" color="primary" />
              <IonLabel>Tickets</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
        <IonFooter>
          <IonToolbar color="background" className="ion-no-padding">
            <IonButtons slot="start" className="ion-no-padding">
              <IonButton onClick={onLogout}>
                <IonIcon color="danger" slot="start" icon={logOutOutline} />
                Cerrar Session
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      </IonMenu>
      <IonRouterOutlet id="rotary-app">
        <Switch>
          <Route path={AppRouteNames.Main} component={MainRouter} />
          <Route exact path="/" render={() => <Redirect to={MainRouteNames.Dashboard} />} />
        </Switch>
      </IonRouterOutlet>
    </>
  )
}

const useInit = () => {
  const launched = useAuthAction('appLaunched')
  const history = useHistory()
  const status = useASelector(state => state.auth.status)
  const logout = useAuthAction('logout', true)

  useEffect(() => {
    launched()
  }, [])

  useEffect(() => {
    if (status === AuthStateEnum.Logoff) {
      history.replace(AuthRouteNames.Login)
    }
    if (status === AuthStateEnum.SignedIn) {
      history.replace(MainRouteNames.Dashboard)
    }
  }, [status])

  const onLogout = useCallback(() => {
    logout()
    menuController.close('first')
  }, [])

  const onTicket = useCallback(() => {
    history.push(MainRouteNames.Ticket)
    menuController.close('first')
  }, [])

  return {onLogout, onTicket}
}
