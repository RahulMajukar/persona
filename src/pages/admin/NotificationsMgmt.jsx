import React, { useState, useEffect } from 'react'
import {
  Bell,
  BellOff,
  Trash2,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  Eye,
  EyeOff,
  Clock,
  AlertCircle,
  CheckSquare,
  Square,
  Send,
  Edit2,
  Save,
  X,
  Download,
  Upload,
  MoreVertical,
  Calendar,
  User,
  Mail,
  Smartphone,
  Globe,
  Settings,
  RefreshCw,
  BellRing,
  BellIcon,
  Archive
} from 'lucide-react'

const NotificationsMgmt = () => {
  // State for notifications
  const [notifications, setNotifications] = useState([])
  const [filteredNotifications, setFilteredNotifications] = useState([])
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  
  // Selection state
  const [selectedNotifications, setSelectedNotifications] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  
  // UI states
  const [loading, setLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editMessage, setEditMessage] = useState('')
  
  // Settings state
  const [settings, setSettings] = useState({
    emailEnabled: true,
    pushEnabled: true,
    smsEnabled: false,
    soundEnabled: true,
    previewEnabled: true,
    autoArchiveDays: 30,
    quietHours: { start: '22:00', end: '07:00', enabled: false }
  })
  
  // Notification types
  const notificationTypes = [
    { id: 'system', label: 'System', icon: Settings, color: 'bg-blue-100 text-blue-600' },
    { id: 'user', label: 'User', icon: User, color: 'bg-green-100 text-green-600' },
    { id: 'alert', label: 'Alert', icon: AlertCircle, color: 'bg-red-100 text-red-600' },
    { id: 'info', label: 'Info', icon: Bell, color: 'bg-purple-100 text-purple-600' },
    { id: 'promo', label: 'Promotional', icon: Mail, color: 'bg-yellow-100 text-yellow-600' }
  ]
  
  // Status options
  const statusOptions = [
    { id: 'unread', label: 'Unread', color: 'bg-blue-500' },
    { id: 'read', label: 'Read', color: 'bg-gray-400' },
    { id: 'archived', label: 'Archived', color: 'bg-gray-600' },
    { id: 'scheduled', label: 'Scheduled', color: 'bg-yellow-500' },
    { id: 'sent', label: 'Sent', color: 'bg-green-500' }
  ]
  
  // Date range options
  const dateOptions = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'week', label: 'Last 7 days' },
    { id: 'month', label: 'Last 30 days' },
    { id: 'quarter', label: 'Last 90 days' },
    { id: 'all', label: 'All time' }
  ]
  
  // Initialize with sample data
  useEffect(() => {
    const sampleNotifications = [
      {
        id: 1,
        title: 'System Maintenance',
        message: 'Scheduled maintenance will occur on Saturday from 2-4 AM',
        type: 'system',
        status: 'unread',
        recipient: 'All Users',
        createdAt: '2024-01-15T10:30:00',
        scheduledFor: null,
        channels: ['email', 'push'],
        priority: 'medium',
        read: false,
        archived: false
      },
      {
        id: 2,
        title: 'Welcome New User',
        message: 'John Doe has joined your organization',
        type: 'user',
        status: 'read',
        recipient: 'Admins',
        createdAt: '2024-01-14T14:20:00',
        scheduledFor: null,
        channels: ['email'],
        priority: 'low',
        read: true,
        archived: false
      },
      {
        id: 3,
        title: 'Security Alert',
        message: 'Unusual login attempt detected from new location',
        type: 'alert',
        status: 'unread',
        recipient: 'Security Team',
        createdAt: '2024-01-14T09:15:00',
        scheduledFor: null,
        channels: ['email', 'push', 'sms'],
        priority: 'high',
        read: false,
        archived: false
      },
      {
        id: 4,
        title: 'Monthly Report Ready',
        message: 'Your monthly analytics report is now available',
        type: 'info',
        status: 'read',
        recipient: 'Managers',
        createdAt: '2024-01-13T08:00:00',
        scheduledFor: null,
        channels: ['email'],
        priority: 'low',
        read: true,
        archived: true
      },
      {
        id: 5,
        title: 'Special Promotion',
        message: 'Get 20% off on premium features this month',
        type: 'promo',
        status: 'scheduled',
        recipient: 'Free Users',
        createdAt: '2024-01-12T16:45:00',
        scheduledFor: '2024-01-20T10:00:00',
        channels: ['email', 'push'],
        priority: 'low',
        read: false,
        archived: false
      },
      {
        id: 6,
        title: 'Password Reset Required',
        message: 'Please reset your password for security reasons',
        type: 'alert',
        status: 'sent',
        recipient: 'Expired Accounts',
        createdAt: '2024-01-12T11:20:00',
        scheduledFor: null,
        channels: ['email'],
        priority: 'medium',
        read: true,
        archived: false
      },
      {
        id: 7,
        title: 'Team Invitation',
        message: 'You have been invited to join Project Alpha team',
        type: 'user',
        status: 'unread',
        recipient: 'Specific Users',
        createdAt: '2024-01-11T15:30:00',
        scheduledFor: null,
        channels: ['email', 'push'],
        priority: 'medium',
        read: false,
        archived: false
      },
      {
        id: 8,
        title: 'Storage Limit Warning',
        message: 'Your storage is at 90% capacity',
        type: 'alert',
        status: 'read',
        recipient: 'All Users',
        createdAt: '2024-01-10T13:10:00',
        scheduledFor: null,
        channels: ['email'],
        priority: 'medium',
        read: true,
        archived: false
      }
    ]
    
    setNotifications(sampleNotifications)
    setFilteredNotifications(sampleNotifications)
    setLoading(false)
  }, [])
  
  // Filter notifications based on filters
  useEffect(() => {
    let filtered = [...notifications]
    
    // Apply tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(notif => 
        activeTab === 'unread' ? !notif.read :
        activeTab === 'archived' ? notif.archived :
        activeTab === 'scheduled' ? notif.scheduledFor :
        true
      )
    }
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(notif => 
        notif.title.toLowerCase().includes(term) ||
        notif.message.toLowerCase().includes(term) ||
        notif.recipient.toLowerCase().includes(term)
      )
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(notif => notif.status === statusFilter)
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(notif => notif.type === typeFilter)
    }
    
    // Apply date range filter
    if (dateRange !== 'all') {
      const now = new Date()
      let startDate = new Date()
      
      switch(dateRange) {
        case 'today':
          startDate.setHours(0, 0, 0, 0)
          break
        case 'yesterday':
          startDate.setDate(startDate.getDate() - 1)
          startDate.setHours(0, 0, 0, 0)
          break
        case 'week':
          startDate.setDate(startDate.getDate() - 7)
          break
        case 'month':
          startDate.setMonth(startDate.getMonth() - 1)
          break
        case 'quarter':
          startDate.setMonth(startDate.getMonth() - 3)
          break
      }
      
      filtered = filtered.filter(notif => {
        const notifDate = new Date(notif.createdAt)
        return notifDate >= startDate
      })
    }
    
    setFilteredNotifications(filtered)
  }, [notifications, searchTerm, statusFilter, typeFilter, dateRange, activeTab])
  
  // Handle selection
  const handleSelect = (id) => {
    setSelectedNotifications(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }
  
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(filteredNotifications.map(notif => notif.id))
    }
    setSelectAll(!selectAll)
  }
  
  // Bulk actions
  const markAsRead = () => {
    setNotifications(prev =>
      prev.map(notif =>
        selectedNotifications.includes(notif.id)
          ? { ...notif, read: true, status: 'read' }
          : notif
      )
    )
    setSelectedNotifications([])
    setShowBulkActions(false)
  }
  
  const markAsUnread = () => {
    setNotifications(prev =>
      prev.map(notif =>
        selectedNotifications.includes(notif.id)
          ? { ...notif, read: false, status: 'unread' }
          : notif
      )
    )
    setSelectedNotifications([])
    setShowBulkActions(false)
  }
  
  const archiveNotifications = () => {
    setNotifications(prev =>
      prev.map(notif =>
        selectedNotifications.includes(notif.id)
          ? { ...notif, archived: true, status: 'archived' }
          : notif
      )
    )
    setSelectedNotifications([])
    setShowBulkActions(false)
  }
  
  const deleteNotifications = () => {
    if (window.confirm(`Delete ${selectedNotifications.length} notification(s)?`)) {
      setNotifications(prev =>
        prev.filter(notif => !selectedNotifications.includes(notif.id))
      )
      setSelectedNotifications([])
      setShowBulkActions(false)
    }
  }
  
  // Individual actions
  const toggleRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id
          ? { ...notif, read: !notif.read, status: !notif.read ? 'read' : 'unread' }
          : notif
      )
    )
  }
  
  const toggleArchive = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id
          ? { ...notif, archived: !notif.archived, status: !notif.archived ? 'archived' : notif.read ? 'read' : 'unread' }
          : notif
      )
    )
  }
  
  const deleteNotification = (id) => {
    if (window.confirm('Delete this notification?')) {
      setNotifications(prev => prev.filter(notif => notif.id !== id))
    }
  }
  
  const startEdit = (notification) => {
    setEditingId(notification.id)
    setEditTitle(notification.title)
    setEditMessage(notification.message)
  }
  
  const saveEdit = () => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === editingId
          ? { ...notif, title: editTitle, message: editMessage }
          : notif
      )
    )
    setEditingId(null)
  }
  
  const cancelEdit = () => {
    setEditingId(null)
  }
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return 'Today, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffDays === 1) {
      return 'Yesterday, ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    }
  }
  
  // Get notification type icon and color
  const getTypeInfo = (type) => {
    return notificationTypes.find(t => t.id === type) || notificationTypes[0]
  }
  
  // Get channel icon
  const getChannelIcon = (channel) => {
    switch(channel) {
      case 'email': return Mail
      case 'push': return Bell
      case 'sms': return Smartphone
      default: return Globe
    }
  }
  
  // Get priority badge color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }
  
  // Create new notification
  const [showNewNotification, setShowNewNotification] = useState(false)
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info',
    recipient: 'All Users',
    channels: ['email'],
    priority: 'medium',
    schedule: false,
    scheduledDate: '',
    scheduledTime: ''
  })
  
  const handleCreateNotification = () => {
    const newId = Math.max(...notifications.map(n => n.id)) + 1
    const newNotif = {
      id: newId,
      title: newNotification.title,
      message: newNotification.message,
      type: newNotification.type,
      status: newNotification.schedule ? 'scheduled' : 'sent',
      recipient: newNotification.recipient,
      createdAt: new Date().toISOString(),
      scheduledFor: newNotification.schedule ? 
        `${newNotification.scheduledDate}T${newNotification.scheduledTime}` : null,
      channels: newNotification.channels,
      priority: newNotification.priority,
      read: false,
      archived: false
    }
    
    setNotifications([newNotif, ...notifications])
    setShowNewNotification(false)
    setNewNotification({
      title: '',
      message: '',
      type: 'info',
      recipient: 'All Users',
      channels: ['email'],
      priority: 'medium',
      schedule: false,
      scheduledDate: '',
      scheduledTime: ''
    })
  }
  
  // Stats
  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    archived: notifications.filter(n => n.archived).length,
    scheduled: notifications.filter(n => n.scheduledFor).length
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notification Management</h1>
            <p className="text-gray-600 mt-2">Manage and monitor all system notifications</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowBulkActions(!showBulkActions)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Bulk Actions
            </button>
            
            <button
              onClick={() => setShowNewNotification(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              New Notification
            </button>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Notifications</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.unread}</p>
              </div>
              <BellOff className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Archived</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.archived}</p>
              </div>
              <Archive className="h-8 w-8 text-gray-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.scheduled}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Bulk Actions Modal */}
      {showBulkActions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Bulk Actions ({selectedNotifications.length} selected)
              </h3>
              <div className="space-y-3">
                <button
                  onClick={markAsRead}
                  className="w-full px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Mark as Read</span>
                </button>
                <button
                  onClick={markAsUnread}
                  className="w-full px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center gap-3"
                >
                  <EyeOff className="h-5 w-5" />
                  <span>Mark as Unread</span>
                </button>
                <button
                  onClick={archiveNotifications}
                  className="w-full px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 flex items-center gap-3"
                >
                  <Archive className="h-5 w-5" />
                  <span>Archive</span>
                </button>
                <button
                  onClick={deleteNotifications}
                  className="w-full px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 flex items-center gap-3"
                >
                  <Trash2 className="h-5 w-5" />
                  <span>Delete</span>
                </button>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowBulkActions(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* New Notification Modal */}
      {showNewNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Create New Notification</h3>
                <button
                  onClick={() => setShowNewNotification(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter notification title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={newNotification.message}
                    onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent h-32"
                    placeholder="Enter notification message"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={newNotification.type}
                      onChange={(e) => setNewNotification({...newNotification, type: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {notificationTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      value={newNotification.priority}
                      onChange={(e) => setNewNotification({...newNotification, priority: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient
                  </label>
                  <input
                    type="text"
                    value={newNotification.recipient}
                    onChange={(e) => setNewNotification({...newNotification, recipient: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., All Users, Admins, Specific Users"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Channels
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {['email', 'push', 'sms'].map(channel => (
                      <label key={channel} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={newNotification.channels.includes(channel)}
                          onChange={(e) => {
                            const channels = e.target.checked
                              ? [...newNotification.channels, channel]
                              : newNotification.channels.filter(c => c !== channel)
                            setNewNotification({...newNotification, channels})
                          }}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">{channel}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={newNotification.schedule}
                      onChange={(e) => setNewNotification({...newNotification, schedule: e.target.checked})}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Schedule for later</span>
                  </label>
                  
                  {newNotification.schedule && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          value={newNotification.scheduledDate}
                          onChange={(e) => setNewNotification({...newNotification, scheduledDate: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Time
                        </label>
                        <input
                          type="time"
                          value={newNotification.scheduledTime}
                          onChange={(e) => setNewNotification({...newNotification, scheduledTime: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowNewNotification(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateNotification}
                  disabled={!newNotification.title || !newNotification.message}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Delivery Channels</h4>
                  <div className="space-y-4">
                    {[
                      { key: 'emailEnabled', label: 'Email Notifications', icon: Mail },
                      { key: 'pushEnabled', label: 'Push Notifications', icon: Bell },
                      { key: 'smsEnabled', label: 'SMS Notifications', icon: Smartphone },
                      { key: 'soundEnabled', label: 'Sound Alerts', icon: BellRing },
                      { key: 'previewEnabled', label: 'Message Previews', icon: Eye }
                    ].map(setting => (
                      <div key={setting.key} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <setting.icon className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-700">{setting.label}</span>
                        </div>
                        <button
                          onClick={() => setSettings({...settings, [setting.key]: !settings[setting.key]})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings[setting.key] ? 'bg-primary-600' : 'bg-gray-200'}`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings[setting.key] ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Automation</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Auto-archive after (days)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="365"
                        value={settings.autoArchiveDays}
                        onChange={(e) => setSettings({...settings, autoArchiveDays: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h5 className="font-medium text-gray-900">Quiet Hours</h5>
                          <p className="text-sm text-gray-600">Pause non-urgent notifications during these hours</p>
                        </div>
                        <button
                          onClick={() => setSettings({...settings, quietHours: {...settings.quietHours, enabled: !settings.quietHours.enabled}})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${settings.quietHours.enabled ? 'bg-primary-600' : 'bg-gray-200'}`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.quietHours.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                      </div>
                      
                      {settings.quietHours.enabled && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Start Time
                            </label>
                            <input
                              type="time"
                              value={settings.quietHours.start}
                              onChange={(e) => setSettings({...settings, quietHours: {...settings.quietHours, start: e.target.value}})}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              End Time
                            </label>
                            <input
                              type="time"
                              value={settings.quietHours.end}
                              onChange={(e) => setSettings({...settings, quietHours: {...settings.quietHours, end: e.target.value}})}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {[
              { id: 'all', label: 'All', count: stats.total },
              { id: 'unread', label: 'Unread', count: stats.unread },
              { id: 'archived', label: 'Archived', count: stats.archived },
              { id: 'scheduled', label: 'Scheduled', count: stats.scheduled }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Filters Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                {statusOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
              
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                {notificationTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
              
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {dateOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
              
              <button
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                  setTypeFilter('all')
                  setDateRange('all')
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
        
        {/* Notifications List */}
        <div>
          {/* Header with select all */}
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleSelectAll}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                {selectAll ? (
                  <CheckSquare className="h-5 w-5 text-primary-600" />
                ) : (
                  <Square className="h-5 w-5 text-gray-400" />
                )}
                <span>Select All</span>
              </button>
              
              {selectedNotifications.length > 0 && (
                <span className="text-sm text-gray-600">
                  {selectedNotifications.length} selected
                </span>
              )}
            </div>
            
            <div className="text-sm text-gray-600">
              {filteredNotifications.length} notifications
            </div>
          </div>
          
          {/* Notifications */}
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No notifications found</p>
              </div>
            ) : (
              filteredNotifications.map(notification => {
                const TypeIcon = getTypeInfo(notification.type).icon
                const typeColor = getTypeInfo(notification.type).color
                
                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 ${notification.read ? '' : 'bg-blue-50'}`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Selection checkbox */}
                      <button
                        onClick={() => handleSelect(notification.id)}
                        className="mt-1"
                      >
                        {selectedNotifications.includes(notification.id) ? (
                          <CheckSquare className="h-5 w-5 text-primary-600" />
                        ) : (
                          <Square className="h-5 w-5 text-gray-300" />
                        )}
                      </button>
                      
                      {/* Type icon */}
                      <div className={`p-2 rounded-lg ${typeColor}`}>
                        <TypeIcon className="h-5 w-5" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                          <div className="flex-1">
                            {editingId === notification.id ? (
                              <div className="space-y-3">
                                <input
                                  type="text"
                                  value={editTitle}
                                  onChange={(e) => setEditTitle(e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium"
                                />
                                <textarea
                                  value={editMessage}
                                  onChange={(e) => setEditMessage(e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                  rows="2"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={saveEdit}
                                    className="px-3 py-1 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={cancelEdit}
                                    className="px-3 py-1 border border-gray-300 text-sm rounded-lg hover:bg-gray-50"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex items-center gap-3 mb-1">
                                  <h4 className="font-medium text-gray-900 truncate">
                                    {notification.title}
                                  </h4>
                                  <span className={`px-2 py-0.5 text-xs rounded-full border ${getPriorityColor(notification.priority)}`}>
                                    {notification.priority}
                                  </span>
                                  {!notification.read && (
                                    <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                                  )}
                                </div>
                                <p className="text-gray-600 text-sm mb-2">
                                  {notification.message}
                                </p>
                              </>
                            )}
                            
                            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {notification.recipient}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {formatDate(notification.createdAt)}
                              </span>
                              {notification.scheduledFor && (
                                <span className="flex items-center gap-1 text-yellow-600">
                                  <Calendar className="h-3 w-3" />
                                  Scheduled: {formatDate(notification.scheduledFor)}
                                </span>
                              )}
                              <div className="flex items-center gap-1">
                                {notification.channels.map(channel => {
                                  const ChannelIcon = getChannelIcon(channel)
                                  return (
                                    <ChannelIcon key={channel} className="h-3 w-3" />
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                          
                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            {editingId !== notification.id && (
                              <>
                                <button
                                  onClick={() => toggleRead(notification.id)}
                                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                                  title={notification.read ? 'Mark as unread' : 'Mark as read'}
                                >
                                  {notification.read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                                <button
                                  onClick={() => startEdit(notification)}
                                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                                  title="Edit"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => toggleArchive(notification.id)}
                                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                                  title={notification.archived ? 'Unarchive' : 'Archive'}
                                >
                                  <Archive className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Showing {filteredNotifications.length} of {notifications.length} notifications
          </div>
          
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Import
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowNewNotification(true)}
          className="h-14 w-14 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700"
        >
          <Send className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

export default NotificationsMgmt