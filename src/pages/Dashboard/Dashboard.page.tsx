import './Dashboard.styles.css'

import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import {alertCircleOutline, refreshOutline, sendSharp} from 'ionicons/icons'
import React from 'react'

import {DashboardHooks} from './Dashboard.hooks'

export const DashboardPage: React.FC = () => {
  const {text, onChange, onSend, keys, clear} = useDashboard()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonButton onClick={clear}>
              <IonIcon slot="icon-only" icon={refreshOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Sentiment Analysis</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="tertiary" fullscreen scrollY>
        {keys.map(id => (
          <Item key={id} id={id} />
        ))}
      </IonContent>
      <IonToolbar color="background">
        <IonItem color="background">
          <IonInput placeholder="Test message" onIonChange={onChange} value={text} />
          <IonButton slot="end" color="background" onClick={onSend}>
            <IonIcon slot="icon-only" icon={sendSharp} />
          </IonButton>
        </IonItem>
      </IonToolbar>
    </IonPage>
  )
}

const Item: React.FC<{id: string}> = ({id}) => {
  const {message, score} = useItem(id)
  if (score < 0.5) {
    return (
      <IonCard className="ion-no-padding">
        <IonItem color="background">
          <IonLabel color="medium">Censored Message</IonLabel>
          <IonIcon slot="end" color="danger" icon={alertCircleOutline} />
        </IonItem>
      </IonCard>
    )
  }

  return (
    <IonCard className="ion-no-padding">
      <IonItem color="background">
        <IonLabel>{message}</IonLabel>
        <IonNote slot="end" color="success">
          positive
        </IonNote>
      </IonItem>
    </IonCard>
  )
}

const {useDashboard, useItem} = DashboardHooks
