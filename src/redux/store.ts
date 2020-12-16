import {configureStore} from '@reduxjs/toolkit'
import {Action, Reducer, Store} from 'redux'
import {Epic, createEpicMiddleware} from 'redux-observable'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export type Persistor = ReturnType<typeof persistStore>

function createStoreWithMiddleware<AppState, AnyAction extends Action, TServices>(
  rootEpic: Epic<AnyAction, AnyAction, AppState>,
  rootReducer: Reducer<AppState>,
  dependencies: TServices,
): {store: Store<AppState, AnyAction>; persistor: Persistor} {
  const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, AppState>({
    dependencies,
  })

  const persistConfig = {
    key: 'root',
    blacklist: ['shop'],
    storage,
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: [epicMiddleware],
  })
  const persistor = persistStore(store)

  epicMiddleware.run(rootEpic)

  return {store: store as any, persistor}
}

export {createStoreWithMiddleware}
