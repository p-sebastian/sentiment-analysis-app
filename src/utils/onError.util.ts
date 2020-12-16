//
//  onError.util.ts
//  Lookback
//
//  Created by Modern Logic on 2020-08-04
//  Copyright © 2020 Lookback App Corporation. All Rights Reserved.

import {AnyAction} from 'redux'
import {StateObservable} from 'redux-observable'
import {ObservableInput, OperatorFunction, concat, of} from 'rxjs'
import {catchError, concatMap} from 'rxjs/operators'

import {errorActions} from '../redux/slices/error.slice'
import {RootState} from '../redux/slices/root.slice'

/*
 * Error Handler for Epics
 *
 * This catches any error thrown within an Epic
 * and maps it to a corresponding handler action
 *
 * So for all error, throw instead of catching them manually in
 * the Epics or services
 *
 * */
export const onError: (
  state$: StateObservable<RootState>,
  caller?: string,
) => OperatorFunction<AnyAction, AnyAction> = (_, caller) => action$ =>
  action$.pipe(
    catchError<AnyAction, ObservableInput<AnyAction>>((error, source) => {
      const errorAction = errorActions.error({code: error?.code ?? 500, message: error?.message ?? 'Unkown Error'})
      const initial = cases(error, caller)
      // initial action in new stream
      const handler = (Array.isArray(initial) ? of<AnyAction>(...initial) : of<AnyAction>(initial)).pipe(
        concatMap(action => [action, errorAction]),
      )
      return concat(handler, source)
    }),
  )

const cases = (error: any, caller?: string) => {
  const message = error?.message ?? error ?? 'Unknown'
  console.warn(message, caller)
  return errorActions.doNothing()
}
