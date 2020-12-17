import {InputChangeEventDetail} from '@ionic/core'
import {useCallback, useState} from 'react'

import {useMessageAction} from '../../hooks/useAction.hook'
import {useASelector} from '../../utils/recipies.util'

const useDashboard = () => {
  const [text, setText] = useState('')
  const keys = useASelector(state => state.message.keys)
  const send = useMessageAction('send')
  const clear = useMessageAction('clear')

  const onChange = (e: CustomEvent<InputChangeEventDetail>) => setText(e.detail.value ?? '')
  const onSend = useCallback(() => {
    send(text)
    setText('')
  }, [text])

  return {text, onChange, onSend, keys, clear}
}

const useItem = (id: string) => {
  const message = useASelector(state => state.message.messages[id], [id])

  return message
}

export const DashboardHooks = {useDashboard, useItem}
