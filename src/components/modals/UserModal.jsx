// components/modals/UserModal.jsx
import { useState, useEffect } from 'react'
import { X, User, Mail, Phone, Shield, Building, Eye, EyeOff } from 'lucide-react'

const UserModal = ({ isOpen, onClose, onSave, user, mode, roles, statuses, teams }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'ROLE_USER',
    status: 'ACTIVE',
    teamId: '',
    phone: '',
    department: '',
    permissions: []
  })
  
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
        role: user.role || 'ROLE_USER',
        status: user.status || 'ACTIVE',
        teamId: user.teamId || '',
        phone: user.phone || '',
        department: user.department || '',
        permissions: user.permissions || []
      })
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'ROLE_USER',
        status: 'ACTIVE',
        teamId: '',
        phone: '',
        department: '',
        permissions: []
      })
    }
    setErrors({})
  }, [user])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (mode === 'create') {
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters'
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        teamId: formData.teamId || null,
        phone: formData.phone,
        department: formData.department,
        permissions: formData.permissions
      }
      
      if (mode === 'create') {
        userData.password = formData.password
      }
      
      await onSave(userData)
      onClose()
    } catch (error) {
      // Error handling is done in parent component
    } finally {
      setLoading(false)
    }
  }

  const handlePermissionToggle = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }))
  }

  if (!isOpen) return null

  const permissionsList = [
    'view_users',
    'edit_users',
    'delete_users',
    'view_teams',
    'edit_teams',
    'view_salaries',
    'edit_salaries',
    'view_reports',
    'export_data'
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {mode === 'create' ? 'Add New User' : mode === 'edit' ? 'Edit User' : 'User Details'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {mode === 'create' ? 'Create a new user account' : 
                 mode === 'edit' ? 'Update user information' : 'View user details'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={mode === 'view'}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      } ${mode === 'view' ? 'bg-gray-50' : ''}`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={mode === 'view'}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      } ${mode === 'view' ? 'bg-gray-50' : ''}`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={mode === 'view'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      disabled={mode === 'view'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Account Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      disabled={mode === 'view'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {roles.map(role => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status *
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      disabled={mode === 'view'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {statuses.map(status => (
                        <option key={status.value} value={status.value}>{status.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Team
                    </label>
                    <select
                      value={formData.teamId}
                      onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
                      disabled={mode === 'view'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">No Team</option>
                      {teams.map(team => (
                        <option key={team.value} value={team.value}>{team.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Password Fields (only for create mode) */}
              {mode === 'create' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className={`w-full pr-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            errors.password ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(s => !s)}
                          className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className={`w-full pr-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                            errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(s => !s)}
                          className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Permissions */}
              {(mode === 'create' || mode === 'edit') && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Permissions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {permissionsList.map(permission => (
                      <label key={permission} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(permission)}
                          onChange={() => handlePermissionToggle(permission)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {mode !== 'view' && (
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </span>
                    ) : mode === 'create' ? (
                      'Create User'
                    ) : (
                      'Update User'
                    )}
                  </button>
                </div>
              )}

              {mode === 'view' && (
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserModal