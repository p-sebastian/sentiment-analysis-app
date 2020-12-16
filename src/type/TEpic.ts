import {AnyAction} from 'redux'
import {Epic} from 'redux-observable'

import {RootState} from '../redux/slices/root.slice'
import {TServices} from './TServices'

export type TEpic = Epic<AnyAction, AnyAction, RootState, TServices>
