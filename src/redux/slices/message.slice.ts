import {PayloadAction, createSlice} from '@reduxjs/toolkit'

import {TMessage} from '../../type/TMessage'

type State = {
  keys: string[]
  messages: {[id: string]: TMessage}
}

const INITIAL_STATE: State = {
  keys: [],
  messages: {},
}

const messageSlice = createSlice({
  name: 'message',
  initialState: INITIAL_STATE,
  reducers: {
    send: (_, {}: PayloadAction<string>) => {},
    save: (state, {payload}: PayloadAction<TMessage>) => {
      state.keys.push(payload.id)
      state.messages = {...state.messages, [payload.id]: payload}
    },
    clear: () => INITIAL_STATE,
  },
})

export const messageReducer = messageSlice.reducer
export const messageActions = messageSlice.actions
