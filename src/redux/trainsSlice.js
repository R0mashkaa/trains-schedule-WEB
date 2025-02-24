import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { route, axiosInstance } from '@/components/requests'

const initialState = {
  loading: '',
  trains: [],
  favoriteTrains: [],
  favoriteTrains: [],
  totalTrains: 0,
  error: null,
}

export const fetchTrains = createAsyncThunk(
  'trains/fetchTrains',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(route.trains_base, {
        params: { from: payload.from, to: payload.to, date: payload.date },
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addFavoriteTrain = createAsyncThunk(
  'trains/addFavoriteTrain',
  async (payload, { rejectWithValue }) => {
    try {
      const token = payload.token
      const response = await axiosInstance.post(
        route.trains_userFavoriteTrains,
        {
          trainId: payload.trainId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchFavoriteTrains = createAsyncThunk(
  'trains/fetchFavoriteTrains',
  async (payload, { rejectWithValue }) => {
    try {
      const token = payload.token
      const response = await axiosInstance.get(
        route.trains_userFavoriteTrains,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteFavoriteTrain = createAsyncThunk(
  'trains/deleteFavoriteTrain',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `${route.trains_userFavoriteTrains}/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      return response.data.trainId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const trainSlice = createSlice({
  name: 'trains',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrains.pending, (state) => {
        state.loading = 'Fetching trains...'
      })
      .addCase(fetchTrains.fulfilled, (state, action) => {
        const payload = action.payload
        state.trains = payload
        state.totalTrains = payload.length || 0
        state.loading = ''
        state.error = null
      })
      .addCase(fetchTrains.rejected, (state, action) => {
        state.loading = ''
        state.error = action.payload
      })

      .addCase(fetchFavoriteTrains.pending, (state) => {
        state.loading = 'Fetching favorite trains...'
      })
      .addCase(fetchFavoriteTrains.fulfilled, (state, action) => {
        const payload = action.payload
        state.favoriteTrains = payload
        state.loading = ''
        state.error = null
      })
      .addCase(fetchFavoriteTrains.rejected, (state, action) => {
        state.loading = ''
        state.error = action.payload
      })

      .addCase(deleteFavoriteTrain.pending, (state) => {
        state.loading = 'Deleting train...'
      })
      .addCase(deleteFavoriteTrain.fulfilled, (state, action) => {
        const deletedId = action.payload
        state.favoriteTrains = state.favoriteTrains.filter(
          (item) => item.Train?.id !== deletedId || item.trainId !== deletedId
        )
        state.loading = ''
        state.error = null
      })
      .addCase(deleteFavoriteTrain.rejected, (state, action) => {
        state.loading = ''
        state.error = action.payload
      })

      .addCase(addFavoriteTrain.pending, (state) => {
        state.loading = 'Adding train to favorites...'
      })
      .addCase(addFavoriteTrain.fulfilled, (state, action) => {
        const addedTrain = action.payload
        state.favoriteTrains.push(addedTrain)
        state.loading = ''
        state.error = null
      })
      .addCase(addFavoriteTrain.rejected, (state, action) => {
        state.loading = ''
        state.error = action.payload
      })
  },
})

export default trainSlice.reducer
