import './Dashboard.styles.css'

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonList,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import {gridOutline} from 'ionicons/icons'
import React from 'react'

import {DashboardHooks} from './Dashboard.hooks'
import Movie from './Movie.component'

export const DashboardPage: React.FC = () => {
  const {loading, snapshots, onMenuToggle} = useDashboard()
  const {loading: l, upcoming} = useUpcoming()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={onMenuToggle}>
              <IonIcon slot="icon-only" icon={gridOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Cine UEES</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="tertiary" fullscreen scrollY>
        {loading || l ? <IonProgressBar type="indeterminate" color="secondary" /> : null}
        <IonList className="ion-no-padding" color="tertiary">
          <IonItemDivider sticky color="background">
            Cartelera
          </IonItemDivider>
          <IonItem className="ion-no-padding" color="tertiary">
            <div className="scrollable">
              {snapshots.map(snap => (
                <Movie key={snap.key} movie={snap.val()} movieId={snap.key} type="current" />
              ))}
            </div>
          </IonItem>
          <IonItemDivider sticky color="background">
            Proximos Estrenos
          </IonItemDivider>
          <IonItem className="ion-no-padding" color="tertiary">
            <div className="scrollable">
              {upcoming.map(snap => (
                <Movie key={snap.key} movie={snap.val()} movieId={snap.key} type="next" />
              ))}
            </div>
          </IonItem>
          <IonItemDivider sticky color="tertiary"></IonItemDivider>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

const {useDashboard, useUpcoming} = DashboardHooks
