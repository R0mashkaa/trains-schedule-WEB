'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import Image from 'next/image'
import Cookies from 'js-cookie'
import { FaUser } from 'react-icons/fa'

import ThemeChanger from './DarkSwitch'
import { route, axiosInstance } from '@/components/requests'

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [userToken, setUserToken] = useState(Cookies.get('access_token') ?? '')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const dropdownRef = useRef(null)
  const pathname = usePathname()

  useEffect(() => {
    setIsFormValid(
      formData.email.trim() !== '' &&
        formData.password.trim() !== '' &&
        (isRegistered
          ? formData.firstName.trim() !== '' && formData.lastName.trim() !== ''
          : true)
    )
  }, [formData, isRegistered])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSignIn = async () => {
    if (!isFormValid) return
    try {
      const { data } = await axiosInstance.post(route.auth_signIn, {
        email: formData.email,
        password: formData.password,
      }).then(
        toast.success('Successfully signed in!')
      )
      Cookies.set('access_token', data.access_token, { expires: 1 })
      setUserToken(data.access_token)
      setIsDropdownOpen(false)
    } catch (error) {
      console.error('Sign-in error:', error)
      toast.error('Failed to sign in. Please check your credentials.')
    }
  }

  const handleSignUp = async () => {
    if (!isFormValid) return
    try {
      const { data } = await axiosInstance.post(route.auth_signUp, formData).then(
        toast.success('Successfully signed in!')
      )
      if (data.access_token) {
        Cookies.set('access_token', data.access_token, { expires: 1 })
        setUserToken(data.access_token)
        setIsDropdownOpen(false)
      }
    } catch (error) {
      console.error('Sign-up error:', error)
      toast.error('Failed to register. Please try again.')
    }
  }

  const handleSignOut = () => {
    Cookies.remove('access_token')
    setUserToken('')
    setIsDropdownOpen(false)
  }

  const menuItems = [
    {
      label: 'My favorites',
      href: '/favorites',
      show: userToken && pathname !== '/favorites',
    },
    {
      label: 'Sign Out',
      action: handleSignOut,
      show: userToken,
    },
  ]

  return (
    <div className="w-full bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <nav className="container flex items-center justify-between p-6 mx-auto lg:px-10">
        <Link
          href="/"
          className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100"
        >
          <Image
            src="/img/logo.svg"
            width={32}
            height={32}
            alt="Logo"
            className="w-8"
          />
          <span>TrainTime</span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeChanger />

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500"
            >
              <FaUser />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transition-opacity duration-200">
                <div className="p-4 text-center">
                  {userToken ? (
                    menuItems.map((item, index) =>
                      item.show ? (
                        item.href ? (
                          <Link
                            key={index}
                            href={item.href}
                            className="block p-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <button
                            key={index}
                            onClick={item.action}
                            className="block w-full p-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-center"
                          >
                            {item.label}
                          </button>
                        )
                      ) : null
                    )
                  ) : !isRegistered ? (
                    <div>
                      <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        onChange={handleInputChange}
                      />
                      <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        onChange={handleInputChange}
                      />
                      <button
                        className={`w-full px-4 py-2 text-white rounded-md ${isFormValid ? 'bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        disabled={!isFormValid}
                        onClick={handleSignIn}
                      >
                        Sign In
                      </button>
                      <Link
                        href="#"
                        onClick={() => setIsRegistered(true)}
                        className="block mt-2 text-sm text-blue-500 dark:text-blue-300 text-center"
                      >
                        Register
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <input
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        className="w-full p-2 mb-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        onChange={handleInputChange}
                      />
                      <input
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        className="w-full p-2 mb-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        onChange={handleInputChange}
                      />
                      <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        onChange={handleInputChange}
                      />
                      <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        onChange={handleInputChange}
                      />
                      <button
                        className="w-full px-4 py-2 text-white rounded-md bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-700"
                        disabled={!isFormValid}
                        onClick={handleSignUp}
                      >
                        Register
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
      />
    </div>
  )
}
