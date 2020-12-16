import {useCallback} from 'react'
import {Selector, useSelector} from 'react-redux'

import {RootState} from '../redux/slices/root.slice'

/**
 * to use when returning a primitive value from
 * the selector
 * @prop props required when selector has value in closure,
 * else it wont re-render when said value changes
 * eg: state => state.server[serverKey].status; serverKey is the prop
 */
export const useASelector = <TSelected, TState = RootState>(selector: Selector<TState, TSelected>, props?: any) =>
  useSelector<TState, TSelected>(useCallback(selector, [props]))

/**
 * takes any prop value from an styled component
 * must pass generic with props type
 * @param key of Prop in styled component
 */
export const extractProp = <P extends unknown>(key: keyof P, or?: any) => (props: P) =>
  props[key] === undefined ? or : props[key]

export const extractFn = <P extends unknown>(key: keyof P, callback: (prop: P[typeof key]) => any) => (props: P) =>
  callback(props[key])

// export const takeColor = <P extends {theme: TTheme}>(key: keyof TTheme['colors']) => (props: P) =>
//   props.theme.colors[key]
// export const takeFont = <P extends {theme: AppTheme}>(
//   key: keyof Theme['fonts'],
// ) => (props: P) => props.theme.fonts[key]
export const wrapper = async <T>(promise: () => Promise<T>, operation_code: number): Promise<T> => {
  try {
    return await promise()
  } catch (e) {
    let message: string | null = null
    let error_code: string | null = null
    if (e && e.message) {
      message = e.message
    } else {
      message = e.constructor.name
    }
    if (e && e.code && typeof e.code === 'string') {
      error_code = e.code
    }
    console.log(
      'Auth Exception!',
      e,
      typeof e,
      operation_code,
      e.constructor.name,
      Object.keys(Object.getPrototypeOf(e)),
      JSON.stringify(e),
    )
    throw new Error(`Error: op: ${operation_code}; code: ${error_code ?? 'UNKNOWN'}; message: ${message}`)
  }
}
