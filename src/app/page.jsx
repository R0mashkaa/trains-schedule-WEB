'use client'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useTheme } from 'next-themes'

import {
  fetchTrains,
  addFavoriteTrain,
  deleteFavoriteTrain,
} from '@/redux/trainsSlice'
import { getMyProfile } from '@/redux/userSlice'
import { getStationsCity } from '@/redux/stationsSlice'
import { SearchForm, TrainCard, Pagination } from '@/components/main'
import { Loader, ErrorAlert, Container } from '@/components'

export default function Home() {
  const userToken = Cookies.get('access_token') ?? ''
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const trainsPerPage = 5
  const [fromDropdownVisible, setFromDropdownVisible] = useState(false)
  const [toDropdownVisible, setToDropdownVisible] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { trains, loading, error, totalTrains } = useSelector(
    (state) => state.trains
  )
  const { stationsCity } = useSelector((state) => state.stations)

  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (userToken) {
      dispatch(getMyProfile({ token: userToken }))
    }
    dispatch(getStationsCity())
    setMounted(true)
  }, [])

  if (!mounted) return null

  const indexOfLastTrain = currentPage * trainsPerPage
  const indexOfFirstTrain = indexOfLastTrain - trainsPerPage
  const currentTrains = trains.slice(indexOfFirstTrain, indexOfLastTrain)

  const handleFindTrains = () => {
    dispatch(fetchTrains({ from, to, date }))
    setCurrentPage(1)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const handleAddToFavorites = (trainId) => {
    if (isFavorite(trainId)) {
      dispatch(deleteFavoriteTrain({ id: trainId, token: userToken }))
    } else {
      dispatch(addFavoriteTrain({ trainId, token: userToken }))
    }
  }

  const isFavorite = (trainId) => {
    // Check if the trainId exists in the user's favorite_routes
    return user?.favorite_routes.some((item) => item.trainId === trainId)
  }

  return (
    <Container>
      <div
        className={`transition-all duration-300 ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <div className="p-4 rounded-xl flex flex-col gap-4">
          <SearchForm
            from={from}
            to={to}
            setFrom={setFrom}
            setTo={setTo}
            setDate={setDate}
            date={date}
            fromDropdownVisible={fromDropdownVisible}
            setFromDropdownVisible={setFromDropdownVisible}
            toDropdownVisible={toDropdownVisible}
            setToDropdownVisible={setToDropdownVisible}
            stationsCity={stationsCity}
            handleFindTrains={handleFindTrains}
            theme={theme}
          />

          {trains.length > 0 ? (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">
                Trains found - {trains.length}
              </h3>
              {currentTrains.map((train) => (
                <TrainCard
                  key={train.id}
                  train={train}
                  userToken={userToken}
                  handleAddToFavorites={handleAddToFavorites}
                  isFavorite={isFavorite}
                  theme={theme}
                />
              ))}
              <Pagination
                currentPage={currentPage}
                totalTrains={totalTrains}
                trainsPerPage={trainsPerPage}
                paginate={paginate}
              />
            </div>
          ) : (
            !loading && (
              <p className="text-center text-gray-500 pt-10">
                No trains were found for the route and date provided
              </p>
            )
          )}
        </div>
      </div>
    </Container>
  )
}
