import {useCallback} from 'react'
import {useDispatch} from 'react-redux'

import {authActions} from '../redux/slices/auth.slice'
import {shopActions} from '../redux/slices/shop.slice'

/*
 * ** Usage **
 * const useAction = makeHook(authActions)
 * const action = useAction('confirmSignUp')
 */
function makeActionHook<T>(actions: T) {
  return <A extends keyof T>(action: A, isNull = false): T[A] => {
    const dispatch = useDispatch()
    const act = actions[action] as any
    const callback = isNull ? () => dispatch(act()) : (payload: any) => dispatch(act(payload))
    return useCallback(callback, []) as any
  }
}

export const useAuthAction = makeActionHook(authActions)
export const useShopAction = makeActionHook(shopActions)
