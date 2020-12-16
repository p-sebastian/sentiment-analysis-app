import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import firebase from 'firebase'

type State = {
  user: firebase.User | null
}

const INITIAL_STATE: State = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    set: (state, {payload}: PayloadAction<firebase.User>) => {
      state.user = payload
    },
  },
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions
