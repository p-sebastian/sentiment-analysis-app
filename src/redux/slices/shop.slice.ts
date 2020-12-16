import {PayloadAction, createSlice} from '@reduxjs/toolkit'

import {TShop} from '../../type/TShop'

type State = {
  current: TShop
}

const INITIAL_STATE: State = {
  current: {
    date: 0,
    movieId: '',
    selectedSeats: {},
  },
}

const shopSlice = createSlice({
  name: 'shop',
  initialState: INITIAL_STATE,
  reducers: {
    current: (state, {payload = {}}: PayloadAction<Partial<TShop>>) => {
      return {...state, current: {...state.current, ...payload}}
    },
    selectSeat: (state, {payload}: PayloadAction<{[key: string]: boolean}>) => {
      return {...state, current: {...state.current, selectedSeats: {...state.current.selectedSeats, ...payload}}}
    },
    clear: () => INITIAL_STATE,
  },
})

export const shopReducer = shopSlice.reducer
export const shopActions = shopSlice.actions
