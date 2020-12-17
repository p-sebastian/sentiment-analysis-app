import {combineEpics} from 'redux-observable'

import {authEpics} from './auth.epic'
import {messageEpics} from './message.epic'

export const rootEpic = combineEpics(...authEpics, ...messageEpics)
