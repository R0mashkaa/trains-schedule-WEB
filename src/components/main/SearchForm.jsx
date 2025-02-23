'use client'

import { useState } from 'react'
import { FaExchangeAlt } from 'react-icons/fa'

const SearchForm = ({
  from,
  to,
  setFrom,
  setTo,
  setDate,
  date,
  fromDropdownVisible,
  setFromDropdownVisible,
  toDropdownVisible,
  setToDropdownVisible,
  stationsCity,
  handleFindTrains,
  theme,
}) => {
  const handleSelectCity = (city, field) => {
    if (field === 'from') {
      setFrom(city)
      setFromDropdownVisible(false)
    } else {
      setTo(city)
      setToDropdownVisible(false)
    }
  }

  const filterCities = (cities, query) => {
    return cities.filter((city) =>
      city.toLowerCase().includes(query.toLowerCase())
    )
  }

  return (
    <div className="relative flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="relative w-full">
          <input
            id="from"
            type="text"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            onFocus={() => setFromDropdownVisible(true)}
            onBlur={() => setTimeout(() => setFromDropdownVisible(false), 100)}
            className="px-4 py-3 w-full border rounded-xl text-lg focus:outline-none"
          />
          {fromDropdownVisible && (
            <ul className={`absolute top-full left-0 w-full border border-gray-300 shadow-lg z-10 max-h-40 overflow-y-auto ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-600'}`}>
              {filterCities(
                stationsCity.map((station) => station.city),
                from
              ).map((city, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectCity(city, 'from')}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="bg-gray-200 p-2 rounded-full"
          onClick={() => {
            setFrom(to)
            setTo(from)
          }}
        >
          <FaExchangeAlt className="text-xl text-gray-600" />
        </button>

        <div className="relative w-full">
          <input
            id="to"
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            onFocus={() => setToDropdownVisible(true)}
            onBlur={() => setTimeout(() => setToDropdownVisible(false), 100)}
            className="px-4 py-3 w-full border rounded-xl text-lg focus:outline-none"
          />
{toDropdownVisible && (
  <ul className={`absolute top-full left-0 w-full border border-gray-300 shadow-lg z-10 max-h-40 overflow-y-auto ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-600'}`}>
    {filterCities(
      stationsCity.map((station) => station.city),
      to
    ).map((city, idx) => (
      <li
        key={idx}
        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
        onClick={() => handleSelectCity(city, 'to')}
      >
        {city}
      </li>
    ))}
  </ul>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-4 py-3 w-full border rounded-xl text-lg focus:outline-none"
        />
      </div>

      <p className="text-sm text-gray-500">
        ℹ️ To search for trains, you need to enter 'From' and 'Date'
      </p>

      <button
        onClick={handleFindTrains}
        disabled={!from || !date}
        className={`w-full text-lg py-3 rounded-xl font-semibold ${!from || !date ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-700 text-white hover:bg-blue-800'}`}
      >
        Find
      </button>
    </div>
  )
}

export default SearchForm
