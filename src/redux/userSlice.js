import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { route, axiosInstance } from '@/components/requests'
import axios from 'axios'

const initialState = {
  user: null,
  error: null,
  loading: false,
}

export const getMyProfile = createAsyncThunk(
  'user/getMyProfile',
  async (payload, { rejectWithValue }) => {
    try {
      const token = payload.token
      const response = await axiosInstance.get(route.user_getMyProfile)

      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError(state, action) {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, setError } = userSlice.actions
export default userSlice.reducer
