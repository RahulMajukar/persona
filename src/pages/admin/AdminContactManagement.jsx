import { useState, useEffect, useMemo } from 'react'
import { 
  Mail, 
  Filter, 
  Search, 
  Download, 
  Trash2, 
  Eye, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  MessageSquare,
  User,
  Calendar,
  MoreVertical,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  MailOpen,
  Archive,
  Flag,
  Send,
  Shield
} from 'lucide-react'
import { contactService } from '../../services/api'
import { format } from 'date-fns'

const AdminContactManagement = () => {
  const [contacts, setContacts] = useState([])
  const [filteredContacts, setFilteredContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedContacts, setSelectedContacts] = useState([])
  const [viewMode, setViewMode] = useState('list') // 'list' or 'card'
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    responded: 0,
    resolved: 0,
    spam: 0
  })

  // Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [sortBy, setSortBy] = useState('newest')

  // Modal states
  const [selectedContact, setSelectedContact] = useState(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showBulkActions, setShowBulkActions] = useState(false)

  // Load contacts on component mount
  useEffect(() => {
    fetchContacts()
  }, [])

  // Apply filters whenever dependencies change
  useEffect(() => {
    applyFilters()
  }, [contacts, searchTerm, statusFilter, dateRange, sortBy])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const data = await contactService.getAll()
      setContacts(data)
      calculateStats(data)
    } catch (err) {
      setError('Failed to load contacts')
      console.error('Error fetching contacts:', err)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (data) => {
    const stats = {
      total: data.length,
      pending: data.filter(c => c.status === 'PENDING').length,
      responded: data.filter(c => c.status === 'RESPONDED').length,
      resolved: data.filter(c => c.status === 'RESOLVED').length,
      spam: data.filter(c => c.status === 'SPAM').length
    }
    setStats(stats)
  }

  const applyFilters = () => {
    let filtered = [...contacts]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(contact => contact.status === statusFilter)
    }

    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(contact => {
        const contactDate = new Date(contact.createdAt)
        const startDate = new Date(dateRange.start)
        const endDate = new Date(dateRange.end)
        endDate.setHours(23, 59, 59, 999)
        return contactDate >= startDate && contactDate <= endDate
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt)
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

    setFilteredContacts(filtered)
  }

  const handleViewContact = (contact) => {
    setSelectedContact(contact)
    setShowViewModal(true)
  }

  const handleDeleteContact = async (id) => {
    try {
      // In a real app, you would call contactService.delete(id)
      // For now, we'll simulate it
      const updatedContacts = contacts.filter(contact => contact.id !== id)
      setContacts(updatedContacts)
      calculateStats(updatedContacts)
      setShowDeleteModal(false)
    } catch (err) {
      console.error('Error deleting contact:', err)
    }
  }

  const handleUpdateStatus = async (id, status, notes) => {
    try {
      await contactService.updateStatus(id, status, notes)
      await fetchContacts() // Refresh the list
    } catch (err) {
      console.error('Error updating status:', err)
    }
  }

  const handleBulkAction = async (action) => {
    if (selectedContacts.length === 0) return

    try {
      switch (action) {
        case 'mark-read':
          // Update all selected contacts
          await Promise.all(
            selectedContacts.map(id => 
              contactService.updateStatus(id, 'RESPONDED', 'Bulk update')
            )
          )
          break
        case 'delete':
          // Delete all selected contacts
          await Promise.all(
            selectedContacts.map(id => 
              // In real app, call delete endpoint
              console.log('Delete contact:', id)
            )
          )
          break
        case 'export':
          exportToCSV()
          break
      }
      
      await fetchContacts()
      setSelectedContacts([])
    } catch (err) {
      console.error('Error performing bulk action:', err)
    }
  }

  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Subject', 'Status', 'Date', 'Message']
    const csvData = filteredContacts.map(contact => [
      contact.id,
      `"${contact.name}"`,
      contact.email,
      `"${contact.subject}"`,
      contact.status,
      format(new Date(contact.createdAt), 'yyyy-MM-dd HH:mm'),
      `"${contact.message.replace(/"/g, '""')}"`
    ])

    const csv = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `contacts_${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'RESPONDED': return 'bg-blue-100 text-blue-800'
      case 'RESOLVED': return 'bg-green-100 text-green-800'
      case 'SPAM': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING': return <Clock className="w-4 h-4" />
      case 'RESPONDED': return <MessageSquare className="w-4 h-4" />
      case 'RESOLVED': return <CheckCircle className="w-4 h-4" />
      case 'SPAM': return <Flag className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const ViewContactModal = () => {
    if (!selectedContact) return null

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedContact.name}</h3>
                  <p className="text-gray-300">{selectedContact.email}</p>
                </div>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-300 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Submission Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {format(new Date(selectedContact.createdAt), 'PPP p')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedContact.status)}`}>
                      {selectedContact.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IP Address:</span>
                    <span className="font-mono text-sm">{selectedContact.ipAddress || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Quick Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedContact.id, 'RESPONDED', 'Marked as responded')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <MailOpen className="w-4 h-4" />
                    <span>Mark as Responded</span>
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedContact.id, 'RESOLVED', 'Marked as resolved')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark as Resolved</span>
                  </button>
                  <a
                    href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Reply via Email</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Subject</h4>
                <p className="text-lg font-medium bg-gray-50 p-4 rounded-lg">
                  {selectedContact.subject}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Message</h4>
                <div className="bg-gray-50 p-6 rounded-lg whitespace-pre-wrap">
                  {selectedContact.message}
                </div>
              </div>

              {selectedContact.responseNotes && (
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Response Notes</h4>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    {selectedContact.responseNotes}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-6 flex justify-end space-x-3">
            <button
              onClick={() => setShowViewModal(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => {
                handleUpdateStatus(selectedContact.id, 'RESOLVED', 'Resolved via admin panel')
                setShowViewModal(false)
              }}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700"
            >
              Mark as Resolved
            </button>
          </div>
        </div>
      </div>
    )
  }

  const DeleteConfirmationModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-6">
          <Trash2 className="w-8 h-8 text-red-600" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
          Delete Contact Submission
        </h3>
        
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete this contact submission? This action cannot be undone.
        </p>
        
        {selectedContact && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="font-medium text-gray-900">{selectedContact.name}</p>
            <p className="text-sm text-gray-600">{selectedContact.email}</p>
            <p className="text-sm text-gray-500 mt-1">{selectedContact.subject}</p>
          </div>
        )}
        
        <div className="flex justify-center space-x-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDeleteContact(selectedContact?.id)}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Mail className="mr-3 text-primary-600" />
              Contact Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and respond to contact form submissions
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button
              onClick={fetchContacts}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Submissions</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-lg">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Responded</p>
                <p className="text-3xl font-bold text-blue-600">{stats.responded}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Resolved</p>
                <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Spam</p>
                <p className="text-3xl font-bold text-red-600">{stats.spam}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <Flag className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="RESPONDED">Responded</option>
              <option value="RESOLVED">Resolved</option>
              <option value="SPAM">Spam</option>
            </select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedContacts.length > 0 && (
          <div className="mt-4 flex items-center justify-between p-3 bg-primary-50 border border-primary-200 rounded-lg">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-primary-600 mr-2" />
              <span className="font-medium text-primary-800">
                {selectedContacts.length} contacts selected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkAction('mark-read')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
              >
                <MailOpen className="w-4 h-4 mr-2" />
                Mark as Read
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedContacts([])}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <span className="text-gray-600">
              Showing {filteredContacts.length} of {contacts.length} contacts
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-100 text-primary-600' : 'text-gray-500'}`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded-lg ${viewMode === 'card' ? 'bg-gray-100 text-primary-600' : 'text-gray-500'}`}
              >
                Card View
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <RefreshCw className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
            <p className="text-gray-600">Loading contacts...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchContacts}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredContacts.length === 0 && (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Mail className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or check back later.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('all')
                setDateRange({ start: '', end: '' })
              }}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* List View */}
        {!loading && !error && filteredContacts.length > 0 && viewMode === 'list' && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedContacts.length === filteredContacts.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedContacts(filteredContacts.map(c => c.id))
                        } else {
                          setSelectedContacts([])
                        }
                      }}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedContacts([...selectedContacts, contact.id])
                          } else {
                            setSelectedContacts(selectedContacts.filter(id => id !== contact.id))
                          }
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                          <span className="text-white font-bold">
                            {contact.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{contact.name}</div>
                          <div className="text-sm text-gray-500">{contact.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="font-medium text-gray-900 truncate">
                          {contact.subject}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {contact.message.substring(0, 60)}...
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                        {getStatusIcon(contact.status)}
                        <span className="ml-1">{contact.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {format(new Date(contact.createdAt), 'MMM d, yyyy')}
                      <br />
                      <span className="text-gray-400">
                        {format(new Date(contact.createdAt), 'h:mm a')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewContact(contact)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <a
                          href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          title="Reply"
                        >
                          <Send className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => {
                            setSelectedContact(contact)
                            setShowDeleteModal(true)
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Card View */}
        {!loading && !error && filteredContacts.length > 0 && viewMode === 'card' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                        <span className="text-white font-bold">
                          {contact.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{contact.name}</h4>
                        <p className="text-sm text-gray-500">{contact.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedContacts([...selectedContacts, contact.id])
                          } else {
                            setSelectedContacts(selectedContacts.filter(id => id !== contact.id))
                          }
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Subject */}
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                    {contact.subject}
                  </h3>

                  {/* Message Preview */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {contact.message}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                      {getStatusIcon(contact.status)}
                      <span className="ml-1">{contact.status}</span>
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {format(new Date(contact.createdAt), 'MMM d')}
                      </span>
                      <button
                        onClick={() => handleViewContact(contact)}
                        className="p-1 text-primary-600 hover:bg-primary-50 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && !error && filteredContacts.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">{Math.min(10, filteredContacts.length)}</span> of{' '}
            <span className="font-medium">{filteredContacts.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              1
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {showViewModal && <ViewContactModal />}
      {showDeleteModal && <DeleteConfirmationModal />}
    </div>
  )
}

export default AdminContactManagement