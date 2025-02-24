'use client'
import { FiHeart } from 'react-icons/fi'

const TrainCard = ({
  train,
  userToken,
  handleAddToFavorites,
  isFavorite,
  theme,
}) => {
  return (
    <div
      className={`relative shadow-lg p-4 rounded-xl mb-6 hover:shadow-xl transition-shadow duration-300 ${theme === 'dark' ? 'bg-gray-600' : 'bg-white'}`}
    >
      {userToken && (
        <div
          onClick={() => handleAddToFavorites(train.id)}
          className="absolute top-2 right-2 cursor-pointer transition-colors duration-300"
        >
          <FiHeart
            size={24}
            className={`absolute top-2 right-2 cursor-pointer transition-colors duration-300 ${isFavorite(train.id) ? 'text-red-500' : 'text-gray-500'}`}
          />
        </div>
      )}
      <h4
        className={`text-lg font-bold ${theme === 'dark' ? 'text-blue-500' : 'text-blue-700'}`}
      >
        {train.name}
      </h4>
      <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        Train Number: {train.number}
      </p>

      {train.Route.stations.map((station) => (
        <div
          key={station.id}
          className={`mt-6 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 ${theme === 'dark' ? 'bg-gray-300' : 'bg-gray-50'}`}
        >
          <div className="flex items-center justify-between">
            <h5 className="text-lg font-semibold text-gray-800">
              {station.Station.name}
            </h5>
            <p className="text-sm text-gray-500">{station.Station.city}</p>
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
          </div>
        </div>
      ))}
    </div>
  )
}

export default TrainCard
