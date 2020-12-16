import {PayloadAction, createSlice} from '@reduxjs/toolkit'

import {AuthSignInPayload} from '../auth.interface'

export enum AuthStateEnum {
  None = 'none',
  SignedIn = 'signed_in',
  SignIn = 'sign_in',
  Registered = 'registered',
  Code = 'code',
  NeedsAccount = 'needs_account',
  Logoff = 'logoff',
}

type State = {
  status: AuthStateEnum
  token: string
}

const INITIAL_STATE: State = {
  status: AuthStateEnum.None,
  token: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    register: (_, {}: PayloadAction<AuthSignInPayload>) => {},
    changeStatus: (state, {payload}: PayloadAction<AuthStateEnum>) => {
      state.status = payload
    },
    login: (_, {}: PayloadAction<AuthSignInPayload>) => {},
    signedIn: (state, {payload}: PayloadAction<string>) => {
      state.status = AuthStateEnum.SignedIn
      state.token = payload
    },
    logout: state => {
      state.status = AuthStateEnum.Logoff
      state.token = ''
    },
    appLaunched: () => {},
  },
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
