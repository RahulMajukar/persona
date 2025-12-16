import { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  UserPlus,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  Eye,
  Key,
  RefreshCw,
  Download,
  Upload,
  Check,
  X,
  UserCheck,
  UserX,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Loader2
} from 'lucide-react'
import DeleteModal from '../../components/modals/DeleteModal'
import UserModal from '../../components/modals/UserModal'
import { userService } from '../../services/api'
import { toast } from 'react-hot-toast'

const Users = () => {
  // States
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Server-side pagination & filtering
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalElements, setTotalElements] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  
  // Filters for API call
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: '',
    teamId: '',
    sortBy: 'name',
    sortDirection: 'asc'
  })
  
  // UI Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [teamFilter, setTeamFilter] = useState('all')
  
  // Modals
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, userId: null })
  const [userModal, setUserModal] = useState({ isOpen: false, user: null, mode: 'create' })
  
  // Teams & Roles
  const [teams, setTeams] = useState([])
  const roles = [
    { value: 'ROLE_ADMIN', label: 'Admin', color: 'bg-purple-100 text-purple-800' },
    { value: 'ROLE_MANAGER', label: 'Manager', color: 'bg-blue-100 text-blue-800' },
    { value: 'ROLE_USER', label: 'User', color: 'bg-gray-100 text-gray-800' }
  ]
  
  const statuses = [
    { value: 'ACTIVE', label: 'Active', color: 'bg-green-100 text-green-800' },
    { value: 'INACTIVE', label: 'Inactive', color: 'bg-red-100 text-red-800' },
    { value: 'SUSPENDED', label: 'Suspended', color: 'bg-yellow-100 text-yellow-800' }
  ]

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        search: searchTerm
      }))
      setCurrentPage(0) // Reset to first page on search
    }, 500) // 500ms debounce

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Update filters when UI filters change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      role: roleFilter === 'all' ? '' : roleFilter,
      status: statusFilter === 'all' ? '' : statusFilter,
      teamId: teamFilter === 'all' ? '' : teamFilter
    }))
    setCurrentPage(0) // Reset to first page on filter change
  }, [roleFilter, statusFilter, teamFilter])

  // Fetch users from API with server-side pagination
  const fetchUsers = async () => {
    try {
      setLoading(true)
      
      // Build query parameters for server-side pagination
      const params = {
        page: currentPage,
        size: pageSize,
        sort: `${filters.sortBy},${filters.sortDirection}`,
        ...(filters.search && { search: filters.search }),
        ...(filters.role && { role: filters.role }),
        ...(filters.status && { status: filters.status }),
        ...(filters.teamId && { teamId: filters.teamId })
      }

      // In a real implementation, your API should support pagination
      // For now, we'll simulate server-side pagination with getAll()
      const allUsers = await userService.getAll()
      
      // Apply filters on server (simulated)
      let filtered = [...allUsers]
      
      if (filters.search) {
        const term = filters.search.toLowerCase()
        filtered = filtered.filter(user => 
          (user.name && user.name.toLowerCase().includes(term)) ||
          (user.email && user.email.toLowerCase().includes(term)) ||
          (user.teamName && user.teamName.toLowerCase().includes(term))
        )
      }
      
      if (filters.role) {
        filtered = filtered.filter(user => user.role === filters.role)
      }
      
      if (filters.status) {
        filtered = filtered.filter(user => user.status === filters.status)
      }
      
      if (filters.teamId) {
        filtered = filtered.filter(user => user.teamName === filters.teamId)
      }
      
      // Apply sorting
      filtered.sort((a, b) => {
        const aValue = a[filters.sortBy] || ''
        const bValue = b[filters.sortBy] || ''
        
        if (filters.sortBy === 'teamName') {
          const aTeam = a.teamName || ''
          const bTeam = b.teamName || ''
          return filters.sortDirection === 'asc' 
            ? aTeam.localeCompare(bTeam)
            : bTeam.localeCompare(aTeam)
        }
        
        if (filters.sortBy === 'joinDate') {
          const aDate = a.joinDate ? new Date(a.joinDate) : new Date(0)
          const bDate = b.joinDate ? new Date(b.joinDate) : new Date(0)
          return filters.sortDirection === 'asc'
            ? aDate - bDate
            : bDate - aDate
        }
        
        return filters.sortDirection === 'asc'
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue))
      })
      
      // Simulate pagination
      const startIndex = currentPage * pageSize
      const paginatedUsers = filtered.slice(startIndex, startIndex + pageSize)
      
      setUsers(paginatedUsers)
      setTotalElements(filtered.length)
      setTotalPages(Math.ceil(filtered.length / pageSize))
      
      // Extract unique teams
      const uniqueTeams = [...new Set(allUsers.filter(u => u.teamName).map(u => u.teamName))]
      setTeams(uniqueTeams.map(team => ({ value: team, label: team })))
      
      setError('')
    } catch (error) {
      console.error('Failed to fetch users:', error)
      setError('Failed to load users. Please try again.')
      toast.error('Failed to load users')
      setUsers([])
      setTeams([])
    } finally {
      setLoading(false)
    }
  }

  // Fetch users when filters or pagination changes
  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, filters])

  // Handle sort
  const requestSort = (key) => {
    const direction = filters.sortBy === key && filters.sortDirection === 'asc' ? 'desc' : 'asc'
    setFilters(prev => ({
      ...prev,
      sortBy: key,
      sortDirection: direction
    }))
  }

  // Handle delete
  const handleDelete = async (userId) => {
    try {
      await userService.delete(userId)
      toast.success('User deleted successfully')
      // Refresh the list
      fetchUsers()
    } catch (error) {
      console.error('Failed to delete user:', error)
      toast.error('Failed to delete user')
    }
  }

  // Handle user create/update
  const handleSaveUser = async (userData) => {
    try {
      if (userModal.mode === 'create') {
        await userService.create(userData)
        toast.success('User created successfully')
      } else {
        await userService.update(userModal.user.id, userData)
        toast.success('User updated successfully')
      }
      // Refresh the list
      fetchUsers()
    } catch (error) {
      console.error('Failed to save user:', error)
      toast.error(error.response?.data?.message || 'Failed to save user')
      throw error
    }
  }

  // Handle status change
  const handleStatusChange = async (userId, newStatus) => {
    try {
      const user = users.find(u => u.id === userId)
      if (!user) return
      
      await userService.update(userId, {
        ...user,
        status: newStatus
      })
      
      toast.success(`User ${newStatus.toLowerCase()} successfully`)
      // Refresh the list
      fetchUsers()
    } catch (error) {
      console.error('Failed to update status:', error)
      toast.error('Failed to update status')
    }
  }

  // Handle export
  const handleExport = async () => {
    try {
      // In real implementation, export API would handle this
      const allUsers = await userService.getAll()
      const dataStr = JSON.stringify(allUsers, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      const exportFileDefaultName = `users-export-${new Date().toISOString().split('T')[0]}.json`
      
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
      
      toast.success('Users exported successfully')
    } catch (error) {
      console.error('Failed to export:', error)
      toast.error('Failed to export users')
    }
  }

  // Get role color
  const getRoleColor = (role) => {
    return roles.find(r => r.value === role)?.color || 'bg-gray-100 text-gray-800'
  }

  // Get status color
  const getStatusColor = (status) => {
    return statuses.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800'
  }

  // Format date
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) : 'N/A'
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('')
    setRoleFilter('all')
    setStatusFilter('all')
    setTeamFilter('all')
    setCurrentPage(0)
  }

  // Loading state
  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading users...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Users Management</h1>
            <p className="text-gray-600 mt-1">Manage all users in your organization</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            <button
              onClick={fetchUsers}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
            <button
              onClick={() => setUserModal({ isOpen: true, user: null, mode: 'create' })}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Add User
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalElements}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {users.filter(u => u.status === 'ACTIVE').length}
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {users.filter(u => u.role === 'ROLE_ADMIN').length}
                </p>
              </div>
              <ShieldCheck className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Teams</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{teams.length}</p>
              </div>
              <Shield className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 text-red-500" />
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Filters Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search users by name, email, or team..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent min-w-[120px]"
            >
              <option value="all">All Roles</option>
              {roles.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent min-w-[120px]"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>

            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent min-w-[120px]"
            >
              <option value="all">All Teams</option>
              {teams.map(team => (
                <option key={team.value} value={team.value}>{team.label}</option>
              ))}
            </select>

            <button
              onClick={resetFilters}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2 whitespace-nowrap"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Users List</h2>
              <p className="text-sm text-gray-600 mt-1">
                Showing {(currentPage * pageSize) + 1} to {Math.min((currentPage + 1) * pageSize, totalElements)} of {totalElements} users
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 whitespace-nowrap">Show:</span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="px-3 py-1.5 border border-gray-300 rounded text-sm"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 whitespace-nowrap">
                  <button
                    onClick={() => requestSort('name')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700"
                  >
                    User
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="text-left py-4 px-6 whitespace-nowrap">
                  <button
                    onClick={() => requestSort('role')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700"
                  >
                    Role
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="text-left py-4 px-6 whitespace-nowrap">
                  <button
                    onClick={() => requestSort('teamName')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700"
                  >
                    Team
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="text-left py-4 px-6 whitespace-nowrap">
                  <button
                    onClick={() => requestSort('status')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700"
                  >
                    Status
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="text-left py-4 px-6 whitespace-nowrap">
                  <button
                    onClick={() => requestSort('joinDate')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700"
                  >
                    Join Date
                    <ArrowUpDown className="h-4 w-4" />
                  </button>
                </th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr 
                    key={user.id} 
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <span className="font-semibold text-primary-600">
                            {user.name?.split(' ').map(n => n[0]).join('') || 'UU'}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">{user.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Mail className="h-3 w-3 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-600 truncate">{user.email}</span>
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-2 mt-1">
                              <Phone className="h-3 w-3 text-gray-400 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{user.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                        {user.role?.replace('ROLE_', '')}
                      </span>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {user.teamName ? (
                          <>
                            <div className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></div>
                            <span className="font-medium text-gray-900 truncate">{user.teamName}</span>
                          </>
                        ) : (
                          <span className="text-gray-400">No Team</span>
                        )}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleStatusChange(user.id, 'ACTIVE')}
                            className={`p-1 rounded ${user.status === 'ACTIVE' ? 'bg-green-100' : 'hover:bg-gray-100'}`}
                            title="Activate"
                          >
                            <Check className="h-3 w-3 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(user.id, 'INACTIVE')}
                            className={`p-1 rounded ${user.status === 'INACTIVE' ? 'bg-red-100' : 'hover:bg-gray-100'}`}
                            title="Deactivate"
                          >
                            <X className="h-3 w-3 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                        {formatDate(user.joinDate)}
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setUserModal({ isOpen: true, user, mode: 'edit' })}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => setUserModal({ isOpen: true, user, mode: 'view' })}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        
                        <button 
                          onClick={() => setDeleteModal({ isOpen: true, userId: user.id })}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <UserX className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                    <button
                      onClick={resetFilters}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Clear Filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {users.length > 0 && totalPages > 1 && (
          <div className="p-6 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-sm text-gray-700">
                Page {currentPage + 1} of {totalPages} • {totalElements} total users
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(0)}
                  disabled={currentPage === 0}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i
                    } else if (currentPage <= 2) {
                      pageNum = i
                    } else if (currentPage >= totalPages - 3) {
                      pageNum = totalPages - 5 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`h-10 w-10 flex items-center justify-center rounded-lg border ${
                          currentPage === pageNum
                            ? 'bg-primary-600 text-white border-primary-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum + 1}
                      </button>
                    )
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages - 1)}
                  disabled={currentPage === totalPages - 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronsRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, userId: null })}
        onConfirm={() => {
          handleDelete(deleteModal.userId)
          setDeleteModal({ isOpen: false, userId: null })
        }}
        itemName={users.find(u => u.id === deleteModal.userId)?.name}
        title="Delete User"
        message="Are you sure you want to delete this user? This action will remove all associated data and cannot be undone."
        confirmText="Delete User"
        cancelText="Cancel"
      />

      {/* User Modal */}
      <UserModal
        isOpen={userModal.isOpen}
        onClose={() => setUserModal({ isOpen: false, user: null, mode: 'create' })}
        onSave={handleSaveUser}
        user={userModal.user}
        mode={userModal.mode}
        roles={roles}
        statuses={statuses}
        teams={teams}
      />
    </div>
  )
}

export default Users