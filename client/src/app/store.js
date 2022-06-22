import { configureStore } from '@reduxjs/toolkit'
import franchiseesReducer from '../features/franchisees/franchiseesSlice'
import locationsReducer from '../features/locations/locationsSlice'
import salesReducer from '../features/sales/salesSlice'

export const store = configureStore({
  reducer: {
    franchisees: franchiseesReducer,
    locations: locationsReducer,
    sales: salesReducer,
  },
})
