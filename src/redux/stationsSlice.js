import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { route, axiosInstance } from '@/components/requests'

const initialState = {
  stationsCity: [],
  error: null,
  loading: false,
}

export const getStationsCity = createAsyncThunk(
  'stations/getStationsCity',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(route.stations_base, {})

      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const stationsSlice = createSlice({
  name: 'stations',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStationsCity.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getStationsCity.fulfilled, (state, action) => {
        state.loading = false
        state.stationsCity = action.payload
      })
      .addCase(getStationsCity.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, setError } = stationsSlice.actions
export default stationsSlice.reducer
