import {concatAll, filter, map, switchMap} from 'rxjs/operators'

import {TEpic} from '../../type/TEpic'
import {onError} from '../../utils/onError.util'
import {authActions} from '../slices/auth.slice'
import {userActions} from '../slices/user.slice'

const e: TEpic[] = []

e[e.length] = (action$, state$, {api}) =>
  action$.pipe(
    filter(authActions.login.match),
    switchMap(({payload}) => api.login(payload)),
    map(res => [userActions.set(res.user!), authActions.signedIn(res.user?.refreshToken ?? '')]),
    concatAll(),
    onError(state$),
  )

e[e.length] = (action$, state$, {api}) =>
  action$.pipe(
    filter(authActions.register.match),
    switchMap(({payload}) => api.register(payload)),
    map(res => [userActions.set(res.user!), authActions.signedIn(res.user?.refreshToken ?? '')]),
    concatAll(),
    onError(state$),
  )

export const authEpics = e
