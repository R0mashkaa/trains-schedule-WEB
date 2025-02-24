'use client'

import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useTheme } from 'next-themes'
import { FiHeart } from 'react-icons/fi'

import { fetchFavoriteTrains, deleteFavoriteTrain } from '@/redux/trainsSlice'
import { Container, Loader } from '@/components'

export default function Favorite() {
  const [currentPage, setCurrentPage] = useState(1)
  const trainsPerPage = 5

  const dispatch = useDispatch()
  const { favoriteTrains, loading, error, totalTrains } = useSelector(
    (state) => state.trains
  )

  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const handleFindFavoriteTrains = () => {
    const accessToken = Cookies.get('access_token')

    if (accessToken) {
      dispatch(fetchFavoriteTrains({ token: accessToken })).catch(() =>
        toast.error('Failed to load favorite trains. Please try again.')
      )
    } else {
      console.error('Access token not found in cookies')
    }

    setCurrentPage(1)
  }

  const handleDelete = (id) => {
    const accessToken = Cookies.get('access_token')

    if (accessToken) {
      dispatch(deleteFavoriteTrain({ id, token: accessToken }))
        .then(() => {
          toast.success('Train removed from favorites!')
        })
        .catch(() => {
          toast.error('Failed to remove train from favorites.')
        })
    } else {
      console.error('Access token not found in cookies')
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    handleFindFavoriteTrains()
  }, [])

  if (!mounted) return null

  const indexOfLastTrain = currentPage * trainsPerPage
  const indexOfFirstTrain = indexOfLastTrain - trainsPerPage
  const currentTrains = favoriteTrains.slice(
    indexOfFirstTrain,
    indexOfLastTrain
  )

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <Container>
      <div
        className={`transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
      >
        {favoriteTrains.length > 0 ? (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">
              Trains found - {favoriteTrains.length}
            </h3>
            {currentTrains.map((favorite) => {
              const { Train } = favorite
              return (
                <div
                  key={Train.id}
                  className={`relative bg-white shadow-lg p-4 rounded-xl mb-6 hover:shadow-xl transition-shadow duration-300 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}
                >
                  <div
                    onClick={() => handleDelete(Train.id)}
                    className="absolute top-2 right-2 cursor-pointer text-red-500 hover:text-gray-500 transition-colors duration-300"
                  >
                    <FiHeart size={24} />
                  </div>

                  <h4
                    className={`text-lg font-bold ${theme === 'dark' ? 'text-blue-500' : 'text-blue-700'}`}
                  >
                    {Train.name}
                  </h4>
                  <p
                    className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
                  >
                    Train Number: {Train.number}
                  </p>
                  {Train.Route.stations.map((station) => (
                    <div
                      key={station.id}
                      className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="text-lg font-semibold text-gray-800">
                          {station.Station.name}
                        </h5>
                        <p className="text-sm text-gray-500">
                          {station.Station.city}
                        </p>
                      </div>
                      <div className="text-sm text-gray-600 mt-2">
                        <p>
                          <strong>Track:</strong> {station.track}
                        </p>
                        <p>
                          <strong>Departure:</strong>{' '}
                          {new Date(station.departure).toLocaleString()}
                        </p>
                        <p>
                          <strong>Arrival:</strong>{' '}
                          {new Date(station.arrive).toLocaleString()}
                        </p>
                        <p>
                          <strong>Departure:</strong>{' '}
                          {new Date(station.departure).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastTrain >= totalTrains}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-500">
              No favorite trains found.
            </p>
          )
        )}
      </div>
      {loading && <Loader />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
      />
    </Container>
  )
}
