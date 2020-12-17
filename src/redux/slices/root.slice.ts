import {combineReducers} from 'redux'

import {authReducer} from './auth.slice'
import {errorReducer} from './error.slice'
import {messageReducer} from './message.slice'
import {shopReducer} from './shop.slice'
import {userReducer} from './user.slice'

export const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  user: userReducer,
  shop: shopReducer,
  message: messageReducer,
})

export type RootState = ReturnType<typeof rootReducer>
