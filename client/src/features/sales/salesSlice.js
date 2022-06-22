import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import config from '../../config'

const initialState = {
  value: 0,
  salesStatus: 'loading',
  salesDict: null,
}

export const fetchSales = createAsyncThunk(
  'sales/fetch',
  async () => {
    const url = config.server('sales')
    const response = await axios.get(url)
    return response.data
  }
)

export const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.salesStatus = 'loading'
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.salesStatus = 'ok'
        state.salesDict = action.payload
      })
  },
})

export default salesSlice.reducer