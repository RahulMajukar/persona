import React, { createContext, useState, useContext, useEffect } from 'react'
import { authService } from '../services/api'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        // Check if token is valid JSON (it shouldn't be)
        try {
          JSON.parse(token) // If this works, token was stored incorrectly
          localStorage.removeItem('token') // Remove malformed token
          return
        } catch (e) {
          // Token is not JSON, which is correct
        }

        const userData = await authService.getCurrentUser()
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          role: userData.role?.replace('ROLE_', '').toLowerCase() || 'user',
          teamId: userData.teamId,
          permissions: userData.permissions || []
        })
      } catch (error) {
        console.error('Auth check failed:', error)
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password)
      // Store token (it should be a string, not JSON)
      localStorage.setItem('token', response.token)

      // Get user info from response
      setUser({
        id: response.id,
        email: response.email,
        name: response.name,
        role: response.role?.replace('ROLE_', '').toLowerCase() || 'user',
        teamId: response.teamId,
        permissions: []
      })

      return {
        success: true,
        role: response.role,
        ...response
      }
    } catch (error) {
      console.error('Login failed:', error)
      return {
        success: false,
        error: error.response?.data?.message || 'Invalid credentials'
      }
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  const hasPermission = (permission) => {
    if (!user) return false
    if (user.role === 'admin') return true
    return user.permissions?.includes(permission) || false
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      hasPermission,
      loading,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  )
}