import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { walletApi } from './walletApi';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: [],
  reducers: {
    totalAction: (state, action) => [...action.payload],
  },
});

export const reducer = combineReducers({
  total: walletSlice.reducer,
  [walletApi.reducerPath]: walletApi.reducer,
});

export const { totalAction } = walletSlice.actions;
