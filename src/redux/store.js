import { configureStore } from '@reduxjs/toolkit'
import trainReducer from './trainsSlice'
import userReducer from './userSlice'
import stationsReducer from './stationsSlice'

const store = configureStore({
  reducer: {
    trains: trainReducer,
    user: userReducer,
    stations: stationsReducer,
  },
})

export default store
