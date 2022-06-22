import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import franchiseesReducer from '../features/franchisees/franchiseesSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    franchisees: franchiseesReducer,
  },
})
