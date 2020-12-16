/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'

import {IonApp} from '@ionic/react'
import {IonReactRouter} from '@ionic/react-router'
import {AnyAction, Store} from '@reduxjs/toolkit'
import React, {useEffect, useState} from 'react'
import {Provider} from 'react-redux'
import {Persistor} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'

import {useDark} from './hooks/useDark.hooks'
import {AppRouter} from './pages/App.routes'
import {rootEpic} from './redux/epics/root.epic'
import {RootState, rootReducer} from './redux/slices/root.slice'
import {createStoreWithMiddleware} from './redux/store'
import {ApiService} from './services/api.service'
import {TServices} from './type/TServices'

const App: React.FC = () => {
  const {persistor, store} = useInit()

  return (
    <IonApp>
      {store === null || persistor === null ? (
        <>{null}</>
      ) : (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <IonReactRouter>
              <AppRouter />
            </IonReactRouter>
          </PersistGate>
        </Provider>
      )}
    </IonApp>
  )
}

const useInit = () => {
  const [store, setStore] = useState<Store | null>(null)
  const [persistor, setPersistor] = useState<Persistor | null>(null)
  const [, setServices] = useState<TServices>()
  useDark()

  useEffect(() => {
    const _services = {api: ApiService.getInstance()}
    const {store, persistor} = createStoreWithMiddleware<RootState, AnyAction, TServices>(
      rootEpic,
      rootReducer,
      _services,
    )
    setStore(store)
    setPersistor(persistor)
    setServices(_services)
  }, [])

  return {store, persistor}
}

export default App
