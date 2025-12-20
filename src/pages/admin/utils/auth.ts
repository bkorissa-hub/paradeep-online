const TOKEN_KEY = 'adminToken'

export const authUtils = {
  // Store token
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token)
  },

  // Get token
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY)
  },

  // Check if logged in
  isLoggedIn: () => {
    return !!localStorage.getItem(TOKEN_KEY)
  },

  // Logout
  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
  }
}
