import {PayloadAction, createSlice} from '@reduxjs/toolkit'

const INITIAL_STATE = {
  code: 0,
  message: '',
}

const errorSlice = createSlice({
  name: '@error',
  initialState: INITIAL_STATE,
  reducers: {
    error: (_, {payload}: PayloadAction<TError>) => payload,
    clear: () => INITIAL_STATE,
    doNothing: () => {},
    showAlert: (_, {payload}: PayloadAction<TError>) => payload,
  },
})

export const errorActions = errorSlice.actions
export const errorReducer = errorSlice.reducer
export type TError = {code: number; message: string}
