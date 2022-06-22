import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import config from '../../config'

const initialState = {
  value: 0,
  locationsStatus: 'loading',
  locationsDict: null,
}

export const fetchLocations = createAsyncThunk(
  'locations/fetch',
  async () => {
    const url = config.server('locations')
    const response = await axios.get(url)
    return response.data
  }
)

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.locationsStatus = 'loading'
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.locationsStatus = 'ok'
        state.locationsDict = action.payload
      })
  },
})

export default locationsSlice.reducer