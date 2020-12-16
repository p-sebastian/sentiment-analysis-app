import {combineEpics} from 'redux-observable'

import {authEpics} from './auth.epic'

export const rootEpic = combineEpics(...authEpics)
