import {filter, map, switchMap} from 'rxjs/operators'
import {v4} from 'uuid'

import {TEpic} from '../../type/TEpic'
import {TMessage} from '../../type/TMessage'
import {onError} from '../../utils/onError.util'
import {messageActions} from '../slices/message.slice'

const e: TEpic[] = []

e[e.length] = (action$, state$, {api}) =>
  action$.pipe(
    filter(messageActions.send.match),
    switchMap(async ({payload}) => {
      const {data} = await api.tensorflow(payload)
      const message: TMessage = {
        id: v4(),
        message: payload,
        score: data[0],
      }
      return messageActions.save(message)
    }),
    onError(state$),
  )

export const messageEpics = e
