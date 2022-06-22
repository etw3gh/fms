import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import config from '../../config'

const initialState = {
  value: 0,
  status: 'idle',
  list: null,
}

export const fetchFranchisees = createAsyncThunk(
  'franchisees/fetch',
  async () => {
    const url = config.server('franchisees')
    const response = await axios.get(url)
    return response.data
  }
)

export const franchiseesSlice = createSlice({
  name: 'franchisees',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFranchisees.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchFranchisees.fulfilled, (state, action) => {
        state.status = 'ok'
        state.list = action.payload
      })
  },
})

export default franchiseesSlice.reducer