import axios from 'axios'
import Cookies from 'js-cookie'
import ErrorAlert from '../Alert'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
})

// Request interceptor for setting authentication tokens, headers, etc.
axiosInstance.interceptors.request.use(
  (config) => {
    // For example, you could add a token from localStorage or a cookie here:
    const token = Cookies.get('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // You can modify the config before the request is sent
    return config
  },
  (error) => {
    // Handle request error
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.status === 401) {
      i
      Cookies.remove('access_token')
      console.error('Unauthorized')
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
