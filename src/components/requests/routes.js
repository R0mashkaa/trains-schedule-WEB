const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const route = {
  auth_signIn: `${API_BASE_URL}/auth/signIn`,
  auth_signUp: `${API_BASE_URL}/auth/signUp`,

  user_getMyProfile: `${API_BASE_URL}/users/myProfile`,

  trains_base: `${API_BASE_URL}/trains`,
  trains_userFavoriteItrans: `${API_BASE_URL}/users/user-favoriteTrains`,

  stations_base: `${API_BASE_URL}/stations`,
}
