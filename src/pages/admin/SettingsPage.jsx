import { useState, useEffect } from 'react'
import {
  User,
  Shield,
  Bell,
  Globe,
  Key,
  Database,
  Palette,
  Moon,
  Sun,
  Monitor,
  FileText,
  Download,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  Lock,
  Save,
  X,
  Settings as SettingsIcon,
  LogOut,
  Users,
  Building,
  CreditCard,
  ShieldCheck,
  Cpu,
  Network,
  RefreshCw,
  Activity,
  DatabaseBackup,
  Cloud} from 'lucide-react'

const SettingsPage = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState('profile')
  
  // User Profile State
  const [userProfile, setUserProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    title: 'Senior Administrator',
    department: 'IT Department',
    location: 'New York, USA',
    bio: 'Passionate about building scalable systems and user-friendly interfaces.',
    joinDate: '2022-03-15'
  })
  
  // Company Settings
  const [companySettings, setCompanySettings] = useState({
    name: 'TechCorp Inc.',
    domain: 'techcorp.com',
    industry: 'Technology',
    size: '500-1000',
    address: '123 Tech Street, San Francisco, CA 94107',
    phone: '+1 (555) 987-6543',
    website: 'https://techcorp.com',
    timezone: 'America/Los_Angeles',
    currency: 'USD',
    fiscalYearStart: 'January',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=TC'
  })
  
  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordPolicy: {
      minLength: 12,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expiryDays: 90
    },
    ipWhitelist: ['192.168.1.1', '10.0.0.1'],
    apiKeys: [
      { id: 'key1', name: 'Production API', lastUsed: '2024-01-15', expires: '2024-04-15' },
      { id: 'key2', name: 'Development API', lastUsed: '2024-01-14', expires: '2024-07-14' }
    ],
    auditLogs: true,
    dataEncryption: true
  })
  
  // Notification Preferences
  const [notifications, setNotifications] = useState({
    email: {
      system: true,
      security: true,
      marketing: false,
      weeklyDigest: true,
      monthlyReport: true
    },
    push: {
      mentions: true,
      comments: true,
      shares: false,
      updates: true
    },
    sms: {
      alerts: true,
      reminders: false,
      otp: true
    },
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '07:00'
    }
  })
  
  // Appearance Settings
  const [appearance, setAppearance] = useState({
    theme: 'light',
    primaryColor: '#3b82f6',
    fontSize: 'medium',
    density: 'comfortable',
    sidebarCollapsed: false,
    animations: true,
    reducedMotion: false
  })
  
  // Billing Information
  const [billing, setBilling] = useState({
    plan: 'Enterprise',
    status: 'active',
    nextBilling: '2024-02-15',
    amount: 2999,
    currency: 'USD',
    paymentMethod: {
      type: 'visa',
      last4: '4242',
      expiry: '12/25'
    },
    usage: {
      users: 45,
      storage: 85,
      apiCalls: 1200000
    },
    invoices: [
      { id: 'INV-001', date: '2024-01-15', amount: 2999, status: 'paid' },
      { id: 'INV-002', date: '2023-12-15', amount: 2999, status: 'paid' }
    ]
  })
  
  // API & Integrations
  const [integrations, setIntegrations] = useState({
    active: [
      { id: 'slack', name: 'Slack', connected: true, lastSync: '2024-01-15' },
      { id: 'github', name: 'GitHub', connected: true, lastSync: '2024-01-14' },
      { id: 'jira', name: 'Jira', connected: true, lastSync: '2024-01-13' }
    ],
    available: [
      { id: 'salesforce', name: 'Salesforce' },
      { id: 'zapier', name: 'Zapier' },
      { id: 'hubspot', name: 'HubSpot' }
    ],
    webhooks: [
      { id: 'wh1', url: 'https://webhook.techcorp.com/events', events: ['user.created', 'user.updated'] }
    ]
  })
  
  // Data & Storage
  const [dataStorage, setDataStorage] = useState({
    totalStorage: 500, // GB
    usedStorage: 425,
    backupEnabled: true,
    backupFrequency: 'daily',
    retentionDays: 30,
    autoCleanup: true,
    regions: ['us-east-1', 'eu-west-1'],
    encryption: 'AES-256',
    compliance: ['GDPR', 'HIPAA', 'SOC2']
  })
  
  // Advanced Settings
  const [advanced, setAdvanced] = useState({
    cacheEnabled: true,
    cacheTtl: 3600,
    cdnEnabled: true,
    cdnProvider: 'Cloudflare',
    loggingLevel: 'info',
    performanceMonitoring: true,
    errorTracking: true,
    featureFlags: {
      betaFeatures: false,
      experimentalUI: false,
      newDashboard: true
    }
  })
  
  // UI States
  const [loading, setLoading] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)
  const [showDeleteAccount, setShowDeleteAccount] = useState(false)
  const [newApiKey, setNewApiKey] = useState({ name: '', expiresIn: '90' })
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  
  // Tabs configuration
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'company', label: 'Company', icon: Building },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'integrations', label: 'Integrations', icon: Network },
    { id: 'data', label: 'Data & Storage', icon: Database },
    { id: 'advanced', label: 'Advanced', icon: SettingsIcon }
  ]
  
  // Initialize with sample data
  useEffect(() => {
    // Simulate loading data
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])
  
  // Handle profile updates
  const handleProfileUpdate = (field, value) => {
    setUserProfile(prev => ({ ...prev, [field]: value }))
  }
  
  // Handle company updates
  const handleCompanyUpdate = (field, value) => {
    setCompanySettings(prev => ({ ...prev, [field]: value }))
  }
  
  // Toggle security setting
  const toggleSecuritySetting = (field) => {
    setSecuritySettings(prev => ({ ...prev, [field]: !prev[field] }))
  }
  
  // Toggle notification setting
  const toggleNotification = (category, field) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: !prev[category][field]
      }
    }))
  }
  
  // Change theme
  const changeTheme = (theme) => {
    setAppearance(prev => ({ ...prev, theme }))
    // In a real app, apply theme to document
    document.documentElement.classList.remove('light', 'dark', 'system')
    document.documentElement.classList.add(theme)
  }
  
  // Change password
  const handleChangePassword = () => {
    if (passwordData.new !== passwordData.confirm) {
      alert('New passwords do not match!')
      return
    }
    
    if (passwordData.new.length < 8) {
      alert('Password must be at least 8 characters long')
      return
    }
    
    // In a real app, make API call
    console.log('Changing password:', passwordData)
    alert('Password changed successfully!')
    setShowChangePassword(false)
    setPasswordData({ current: '', new: '', confirm: '' })
  }
  
  // Generate API key
  const handleGenerateApiKey = () => {
    const newKey = {
      id: 'key' + Date.now(),
      name: newApiKey.name,
      lastUsed: new Date().toISOString().split('T')[0],
      expires: new Date(Date.now() + newApiKey.expiresIn * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
    
    setSecuritySettings(prev => ({
      ...prev,
      apiKeys: [...prev.apiKeys, newKey]
    }))
    
    setShowApiKeyModal(false)
    setNewApiKey({ name: '', expiresIn: '90' })
    
    // Show success message
    alert(`API Key generated successfully!\n\nPlease copy it now as it won't be shown again.`)
  }
  
  // Revoke API key
  const handleRevokeApiKey = (id) => {
    if (window.confirm('Are you sure you want to revoke this API key?')) {
      setSecuritySettings(prev => ({
        ...prev,
        apiKeys: prev.apiKeys.filter(key => key.id !== id)
      }))
    }
  }
  
  // Save all settings
  const saveSettings = () => {
    setLoading(true)
    
    // In a real app, make API calls to save all settings
    setTimeout(() => {
      console.log('Saving settings:', {
        userProfile,
        companySettings,
        securitySettings,
        notifications,
        appearance,
        billing,
        integrations,
        dataStorage,
        advanced
      })
      
      setLoading(false)
      alert('Settings saved successfully!')
    }, 1500)
  }
  
  // Reset to defaults
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults?')) {
      // Reset logic would go here
      alert('Settings have been reset to defaults.')
    }
  }
  
  // Export settings
  const exportSettings = () => {
    const settingsData = {
      userProfile,
      companySettings,
      securitySettings,
      notifications,
      appearance,
      billing,
      integrations,
      dataStorage,
      advanced
    }
    
    const dataStr = JSON.stringify(settingsData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = 'settings-export-' + new Date().toISOString().split('T')[0] + '.json'
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  // Calculate storage percentage
  const storagePercentage = (dataStorage.usedStorage / dataStorage.totalStorage) * 100
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">System Settings</h1>
            <p className="text-gray-600 mt-2">Manage your account and system preferences</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportSettings}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Settings
            </button>
            
            <button
              onClick={resetToDefaults}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Defaults
            </button>
            
            <button
              onClick={saveSettings}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Storage Used</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {dataStorage.usedStorage} GB
                </p>
                <p className="text-xs text-gray-500">
                  {storagePercentage.toFixed(1)}% of {dataStorage.totalStorage} GB
                </p>
              </div>
              <Database className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${storagePercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {billing.usage.users}
                </p>
                <p className="text-xs text-gray-500">Licensed users</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">API Calls</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {(billing.usage.apiCalls / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-gray-500">This month</p>
              </div>
              <Activity className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Next Billing</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${billing.amount}
                </p>
                <p className="text-xs text-gray-500">{formatDate(billing.nextBilling)}</p>
              </div>
              <CreditCard className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 sticky top-6">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Settings</h3>
            </div>
            
            <div className="p-2">
              {tabs.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg text-sm font-medium mb-1 ${
                      activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => alert('Logging out...')}
                className="flex items-center gap-3 w-full p-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
                Log Out
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Settings Panel */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-200">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                
                <div className="space-y-8">
                  {/* Avatar Section */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Picture</h3>
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      <div className="relative">
                        <img
                          src={userProfile.avatar}
                          alt={userProfile.firstName}
                          className="h-32 w-32 rounded-xl object-cover border-4 border-white shadow-lg"
                        />
                        <button
                          onClick={() => {
                            // In real app, trigger file upload
                            const input = document.createElement('input')
                            input.type = 'file'
                            input.accept = 'image/*'
                            input.onchange = (e) => {
                              const file = e.target.files[0]
                              if (file) {
                                const reader = new FileReader()
                                reader.onloadend = () => {
                                  setUserProfile(prev => ({ ...prev, avatar: reader.result }))
                                }
                                reader.readAsDataURL(file)
                              }
                            }
                            input.click()
                          }}
                          className="absolute -bottom-2 -right-2 bg-primary-600 text-white p-2 rounded-full shadow-lg hover:bg-primary-700"
                        >
                          <User className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-4">
                          Upload a new photo. JPG, PNG or GIF, max 2MB.
                        </p>
                        <div className="flex gap-3">
                          <button className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700">
                            Upload New
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={userProfile.firstName}
                          onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={userProfile.lastName}
                          onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={userProfile.email}
                          onChange={(e) => handleProfileUpdate('email', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={userProfile.phone}
                          onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Title
                        </label>
                        <input
                          type="text"
                          value={userProfile.title}
                          onChange={(e) => handleProfileUpdate('title', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Department
                        </label>
                        <select
                          value={userProfile.department}
                          onChange={(e) => handleProfileUpdate('department', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option>IT Department</option>
                          <option>Marketing</option>
                          <option>Sales</option>
                          <option>HR</option>
                          <option>Finance</option>
                          <option>Operations</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={userProfile.bio}
                        onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Account Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={userProfile.location}
                          onChange={(e) => handleProfileUpdate('location', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Member Since
                        </label>
                        <input
                          type="text"
                          value={formatDate(userProfile.joinDate)}
                          readOnly
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Danger Zone */}
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="text-lg font-medium text-red-700 mb-4">Danger Zone</h3>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-red-800">Delete Account</h4>
                          <p className="text-sm text-red-600 mt-1">
                            Once you delete your account, there is no going back. Please be certain.
                          </p>
                        </div>
                        <button
                          onClick={() => setShowDeleteAccount(true)}
                          className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 whitespace-nowrap"
                        >
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Company Tab */}
            {activeTab === 'company' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Company Settings</h2>
                
                <div className="space-y-8">
                  {/* Company Logo */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Company Logo</h3>
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                      <div className="relative">
                        <img
                          src={companySettings.logo}
                          alt={companySettings.name}
                          className="h-24 w-24 rounded-lg object-cover border-4 border-white shadow-lg"
                        />
                        <button
                          onClick={() => {
                            const input = document.createElement('input')
                            input.type = 'file'
                            input.accept = 'image/*'
                            input.onchange = (e) => {
                              const file = e.target.files[0]
                              if (file) {
                                const reader = new FileReader()
                                reader.onloadend = () => {
                                  setCompanySettings(prev => ({ ...prev, logo: reader.result }))
                                }
                                reader.readAsDataURL(file)
                              }
                            }
                            input.click()
                          }}
                          className="absolute -bottom-2 -right-2 bg-primary-600 text-white p-2 rounded-full shadow-lg hover:bg-primary-700"
                        >
                          <Building className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-4">
                          Upload your company logo. Recommended size: 400x400px.
                        </p>
                        <div className="flex gap-3">
                          <button className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700">
                            Upload Logo
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">
                            Remove Logo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Company Details */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Company Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={companySettings.name}
                          onChange={(e) => handleCompanyUpdate('name', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Domain
                        </label>
                        <input
                          type="text"
                          value={companySettings.domain}
                          onChange={(e) => handleCompanyUpdate('domain', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Industry
                        </label>
                        <select
                          value={companySettings.industry}
                          onChange={(e) => handleCompanyUpdate('industry', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option>Technology</option>
                          <option>Finance</option>
                          <option>Healthcare</option>
                          <option>Retail</option>
                          <option>Manufacturing</option>
                          <option>Education</option>
                          <option>Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Size
                        </label>
                        <select
                          value={companySettings.size}
                          onChange={(e) => handleCompanyUpdate('size', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option>1-10</option>
                          <option>11-50</option>
                          <option>51-200</option>
                          <option>201-500</option>
                          <option>500-1000</option>
                          <option>1000+</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={companySettings.phone}
                          onChange={(e) => handleCompanyUpdate('phone', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Website
                        </label>
                        <input
                          type="url"
                          value={companySettings.website}
                          onChange={(e) => handleCompanyUpdate('website', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <textarea
                        value={companySettings.address}
                        onChange={(e) => handleCompanyUpdate('address', e.target.value)}
                        rows="2"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Regional Settings */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Regional Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Timezone
                        </label>
                        <select
                          value={companySettings.timezone}
                          onChange={(e) => handleCompanyUpdate('timezone', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="Europe/London">London (GMT)</option>
                          <option value="Europe/Paris">Paris (CET)</option>
                          <option value="Asia/Tokyo">Tokyo (JST)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Currency
                        </label>
                        <select
                          value={companySettings.currency}
                          onChange={(e) => handleCompanyUpdate('currency', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option>USD</option>
                          <option>EUR</option>
                          <option>GBP</option>
                          <option>JPY</option>
                          <option>CAD</option>
                          <option>AUD</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fiscal Year Start
                        </label>
                        <select
                          value={companySettings.fiscalYearStart}
                          onChange={(e) => handleCompanyUpdate('fiscalYearStart', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option>January</option>
                          <option>February</option>
                          <option>March</option>
                          <option>April</option>
                          <option>July</option>
                          <option>October</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
                
                <div className="space-y-8">
                  {/* Two-Factor Authentication */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Key className="h-6 w-6 text-blue-500" />
                        <div>
                          <h4 className="font-medium text-gray-900">2FA Status</h4>
                          <p className="text-sm text-gray-600">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSecuritySetting('twoFactorAuth')}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          securitySettings.twoFactorAuth ? 'bg-green-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                    
                    {securitySettings.twoFactorAuth && (
                      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="font-medium text-green-800">2FA is enabled</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Two-factor authentication is active on your account. You'll need to enter a verification code from your authenticator app when signing in.
                        </p>
                        <div className="flex gap-3 mt-4">
                          <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                            View Recovery Codes
                          </button>
                          <button className="px-4 py-2 border border-green-600 text-green-700 text-sm rounded-lg hover:bg-green-50">
                            Change Device
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Password */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Password</h3>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900">Password Strength</h4>
                          <p className="text-sm text-gray-600">Last changed 15 days ago</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-3/4"></div>
                          </div>
                          <span className="text-sm font-medium text-green-600">Strong</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setShowChangePassword(true)}
                        className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700"
                      >
                        Change Password
                      </button>
                    </div>
                    
                    {/* Password Policy */}
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Password Policy</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { label: 'Minimum Length', value: `${securitySettings.passwordPolicy.minLength} characters` },
                          { label: 'Uppercase Letters', value: securitySettings.passwordPolicy.requireUppercase ? 'Required' : 'Optional' },
                          { label: 'Lowercase Letters', value: securitySettings.passwordPolicy.requireLowercase ? 'Required' : 'Optional' },
                          { label: 'Numbers', value: securitySettings.passwordPolicy.requireNumbers ? 'Required' : 'Optional' },
                          { label: 'Special Characters', value: securitySettings.passwordPolicy.requireSpecialChars ? 'Required' : 'Optional' },
                          { label: 'Password Expiry', value: `${securitySettings.passwordPolicy.expiryDays} days` }
                        ].map((policy, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-700">{policy.label}</span>
                            <span className="text-sm font-medium text-gray-900">{policy.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Session Management */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Session Management</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock className="h-6 w-6 text-blue-500" />
                          <div>
                            <h4 className="font-medium text-gray-900">Session Timeout</h4>
                            <p className="text-sm text-gray-600">
                              Automatically log out after inactivity
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min="5"
                            max="120"
                            step="5"
                            value={securitySettings.sessionTimeout}
                            onChange={(e) => setSecuritySettings(prev => ({
                              ...prev,
                              sessionTimeout: parseInt(e.target.value)
                            }))}
                            className="w-32"
                          />
                          <span className="font-medium text-gray-900">{securitySettings.sessionTimeout} min</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bell className="h-6 w-6 text-blue-500" />
                          <div>
                            <h4 className="font-medium text-gray-900">Login Alerts</h4>
                            <p className="text-sm text-gray-600">
                              Get notified about new sign-ins
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSecuritySetting('loginAlerts')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            securitySettings.loginAlerts ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            securitySettings.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* API Keys */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">API Keys</h3>
                      <button
                        onClick={() => setShowApiKeyModal(true)}
                        className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700"
                      >
                        Generate New Key
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {securitySettings.apiKeys.map((key) => (
                        <div key={key.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{key.name}</h4>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-600">
                                Last used: {formatDate(key.lastUsed)}
                              </span>
                              <span className="text-sm text-gray-600">
                                Expires: {formatDate(key.expires)}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRevokeApiKey(key.id)}
                            className="px-3 py-1 border border-red-300 text-red-600 text-sm rounded-lg hover:bg-red-50"
                          >
                            Revoke
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* IP Whitelist */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">IP Whitelist</h3>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-600 mb-4">
                        Restrict access to specific IP addresses
                      </p>
                      <div className="space-y-2">
                        {securitySettings.ipWhitelist.map((ip, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <span className="font-mono text-sm">{ip}</span>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <X className="h-4 w-4 text-gray-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button className="mt-4 px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                        Add IP Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                
                <div className="space-y-8">
                  {/* Email Notifications */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                      {Object.entries(notifications.email).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Receive {key} notifications via email
                            </p>
                          </div>
                          <button
                            onClick={() => toggleNotification('email', key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              value ? 'bg-green-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Push Notifications */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
                    <div className="space-y-3">
                      {Object.entries(notifications.push).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Receive {key} push notifications
                            </p>
                          </div>
                          <button
                            onClick={() => toggleNotification('push', key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              value ? 'bg-green-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* SMS Notifications */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">SMS Notifications</h3>
                    <div className="space-y-3">
                      {Object.entries(notifications.sms).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900 capitalize">
                              {key.toUpperCase()} Messages
                            </h4>
                            <p className="text-sm text-gray-600">
                              Receive {key} via SMS
                            </p>
                          </div>
                          <button
                            onClick={() => toggleNotification('sms', key)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              value ? 'bg-green-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Quiet Hours */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Quiet Hours</h3>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900">Enable Quiet Hours</h4>
                          <p className="text-sm text-gray-600">
                            Pause non-urgent notifications during specified hours
                          </p>
                        </div>
                        <button
                          onClick={() => setNotifications(prev => ({
                            ...prev,
                            quietHours: { ...prev.quietHours, enabled: !prev.quietHours.enabled }
                          }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            notifications.quietHours.enabled ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            notifications.quietHours.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      
                      {notifications.quietHours.enabled && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Start Time
                            </label>
                            <input
                              type="time"
                              value={notifications.quietHours.start}
                              onChange={(e) => setNotifications(prev => ({
                                ...prev,
                                quietHours: { ...prev.quietHours, start: e.target.value }
                              }))}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              End Time
                            </label>
                            <input
                              type="time"
                              value={notifications.quietHours.end}
                              onChange={(e) => setNotifications(prev => ({
                                ...prev,
                                quietHours: { ...prev.quietHours, end: e.target.value }
                              }))}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Appearance Settings</h2>
                
                <div className="space-y-8">
                  {/* Theme */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: 'light', label: 'Light', icon: Sun, description: 'Light background with dark text' },
                        { id: 'dark', label: 'Dark', icon: Moon, description: 'Dark background with light text' },
                        { id: 'system', label: 'System', icon: Monitor, description: 'Follows your device theme' }
                      ].map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => changeTheme(theme.id)}
                          className={`p-4 border rounded-lg text-left transition-all ${
                            appearance.theme === theme.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <theme.icon className={`h-6 w-6 mb-3 ${
                            appearance.theme === theme.id ? 'text-primary-600' : 'text-gray-400'
                          }`} />
                          <h4 className="font-medium text-gray-900">{theme.label}</h4>
                          <p className="text-sm text-gray-600 mt-1">{theme.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Colors */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Primary Color</h3>
                    <div className="flex flex-wrap gap-3">
                      {[
                        '#3b82f6', // Blue
                        '#8b5cf6', // Purple
                        '#10b981', // Emerald
                        '#f59e0b', // Amber
                        '#ef4444', // Red
                        '#06b6d4', // Cyan
                        '#84cc16', // Lime
                        '#f97316'  // Orange
                      ].map((color) => (
                        <button
                          key={color}
                          onClick={() => setAppearance(prev => ({ ...prev, primaryColor: color }))}
                          className={`w-10 h-10 rounded-full border-2 ${
                            appearance.primaryColor === color ? 'border-gray-900' : 'border-gray-200'
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Typography */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Typography</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: 'small', label: 'Small', size: 'text-sm' },
                        { id: 'medium', label: 'Medium', size: 'text-base' },
                        { id: 'large', label: 'Large', size: 'text-lg' }
                      ].map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setAppearance(prev => ({ ...prev, fontSize: size.id }))}
                          className={`p-4 border rounded-lg text-center ${
                            appearance.fontSize === size.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200'
                          }`}
                        >
                          <div className={`font-medium ${size.size}`}>
                            Aa
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{size.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Layout */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Layout</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Sidebar Collapsed</h4>
                          <p className="text-sm text-gray-600">Collapse the sidebar by default</p>
                        </div>
                        <button
                          onClick={() => setAppearance(prev => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            appearance.sidebarCollapsed ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            appearance.sidebarCollapsed ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Animations</h4>
                          <p className="text-sm text-gray-600">Enable interface animations</p>
                        </div>
                        <button
                          onClick={() => setAppearance(prev => ({ ...prev, animations: !prev.animations }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            appearance.animations ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            appearance.animations ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">Reduced Motion</h4>
                          <p className="text-sm text-gray-600">Reduce motion for accessibility</p>
                        </div>
                        <button
                          onClick={() => setAppearance(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            appearance.reducedMotion ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            appearance.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing & Subscription</h2>
                
                <div className="space-y-8">
                  {/* Current Plan */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Current Plan</h3>
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h4 className="text-2xl font-bold">{billing.plan} Plan</h4>
                          <p className="text-blue-100 mt-2">
                            ${billing.amount}/{billing.currency === 'USD' ? 'month' : 'mo'}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            billing.status === 'active'
                              ? 'bg-green-500 text-white'
                              : 'bg-yellow-500 text-white'
                          }`}>
                            {billing.status.charAt(0).toUpperCase() + billing.status.slice(1)}
                          </span>
                          <button className="px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50">
                            Upgrade Plan
                          </button>
                        </div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-blue-100 text-sm">Next Billing Date</p>
                          <p className="font-medium">{formatDate(billing.nextBilling)}</p>
                        </div>
                        <div>
                          <p className="text-blue-100 text-sm">Payment Method</p>
                          <p className="font-medium">
                            {billing.paymentMethod.type.toUpperCase()} •••• {billing.paymentMethod.last4}
                          </p>
                        </div>
                        <div>
                          <p className="text-blue-100 text-sm">Billing Cycle</p>
                          <p className="font-medium">Monthly</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Usage */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Usage</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: 'Users', value: billing.usage.users, max: 100, color: 'bg-blue-500' },
                        { label: 'Storage', value: billing.usage.storage, max: 100, color: 'bg-green-500' },
                        { label: 'API Calls', value: (billing.usage.apiCalls / 1000000).toFixed(1), max: 2, unit: 'M', color: 'bg-purple-500' }
                      ].map((item, index) => (
                        <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">{item.label}</span>
                            <span className="font-medium text-gray-900">
                              {item.value}{item.unit || ''} / {item.max}{item.unit || ''}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${item.color}`}
                              style={{ width: `${(item.value / item.max) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Payment Method */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-16 bg-blue-500 rounded flex items-center justify-center">
                            <span className="text-white font-bold">VISA</span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Visa •••• {billing.paymentMethod.last4}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Expires {billing.paymentMethod.expiry}
                            </p>
                          </div>
                        </div>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                          Update
                        </button>
                      </div>
                      
                      <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                        Add Payment Method
                      </button>
                    </div>
                  </div>
                  
                  {/* Invoices */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Invoices</h3>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        View All Invoices
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {billing.invoices.map((invoice) => (
                        <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{invoice.id}</h4>
                            <p className="text-sm text-gray-600">{formatDate(invoice.date)}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-medium text-gray-900">
                              ${invoice.amount}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              invoice.status === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {invoice.status}
                            </span>
                            <button className="text-primary-600 hover:text-primary-700">
                              <Download className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Integrations Tab */}
            {activeTab === 'integrations' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Integrations & API</h2>
                
                <div className="space-y-8">
                  {/* Active Integrations */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Active Integrations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {integrations.active.map((integration) => (
                        <div key={integration.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                <Network className="h-5 w-5 text-primary-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{integration.name}</h4>
                                <p className="text-xs text-gray-600">
                                  Last synced: {formatDate(integration.lastSync)}
                                </p>
                              </div>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                              Connected
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50">
                              Configure
                            </button>
                            <button className="flex-1 px-3 py-2 border border-red-300 text-red-600 text-sm rounded-lg hover:bg-red-50">
                              Disconnect
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Available Integrations */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Available Integrations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {integrations.available.map((integration) => (
                        <div key={integration.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Network className="h-5 w-5 text-gray-500" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{integration.name}</h4>
                            </div>
                          </div>
                          <button className="w-full px-3 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700">
                            Connect
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Webhooks */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Webhooks</h3>
                      <button className="px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700">
                        Add Webhook
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {integrations.webhooks.map((webhook) => (
                        <div key={webhook.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-2">{webhook.url}</h4>
                              <div className="flex flex-wrap gap-2">
                                {webhook.events.map((event) => (
                                  <span key={event} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                    {event}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                              <Trash2 className="h-4 w-4 text-gray-500" />
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                              Test
                            </button>
                            <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                              Edit
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Data & Storage Tab */}
            {activeTab === 'data' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Data & Storage</h2>
                
                <div className="space-y-8">
                  {/* Storage Overview */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Storage Overview</h3>
                    <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900">
                            {dataStorage.usedStorage} GB
                          </h4>
                          <p className="text-gray-600">Used of {dataStorage.totalStorage} GB</p>
                        </div>
                        <div className="relative w-32 h-32">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#e5e7eb"
                              strokeWidth="10"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="#3b82f6"
                              strokeWidth="10"
                              strokeLinecap="round"
                              strokeDasharray={`${storagePercentage * 2.83} 283`}
                              transform="rotate(-90 50 50)"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-900">
                              {storagePercentage.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <button className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">
                        Upgrade Storage
                      </button>
                    </div>
                  </div>
                  
                  {/* Backup Settings */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Backup Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <DatabaseBackup className="h-6 w-6 text-blue-500" />
                          <div>
                            <h4 className="font-medium text-gray-900">Automatic Backups</h4>
                            <p className="text-sm text-gray-600">
                              Enable automatic data backups
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setDataStorage(prev => ({ ...prev, backupEnabled: !prev.backupEnabled }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            dataStorage.backupEnabled ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            dataStorage.backupEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      
                      {dataStorage.backupEnabled && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Backup Frequency
                            </label>
                            <select
                              value={dataStorage.backupFrequency}
                              onChange={(e) => setDataStorage(prev => ({ ...prev, backupFrequency: e.target.value }))}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            >
                              <option value="hourly">Hourly</option>
                              <option value="daily">Daily</option>
                              <option value="weekly">Weekly</option>
                              <option value="monthly">Monthly</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Retention Period
                            </label>
                            <select
                              value={dataStorage.retentionDays}
                              onChange={(e) => setDataStorage(prev => ({ ...prev, retentionDays: e.target.value }))}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            >
                              <option value="7">7 days</option>
                              <option value="30">30 days</option>
                              <option value="90">90 days</option>
                              <option value="365">1 year</option>
                            </select>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Trash2 className="h-6 w-6 text-blue-500" />
                          <div>
                            <h4 className="font-medium text-gray-900">Auto Cleanup</h4>
                            <p className="text-sm text-gray-600">
                              Automatically delete old backups
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setDataStorage(prev => ({ ...prev, autoCleanup: !prev.autoCleanup }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            dataStorage.autoCleanup ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            dataStorage.autoCleanup ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Data Regions */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Data Regions</h3>
                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-sm text-gray-600 mb-4">
                        Your data is stored in the following regions:
                      </p>
                      <div className="space-y-2">
                        {dataStorage.regions.map((region) => (
                          <div key={region} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Globe className="h-5 w-5 text-gray-400" />
                              <span className="font-medium">{region}</span>
                            </div>
                            <span className="text-sm text-gray-600">Primary</span>
                          </div>
                        ))}
                      </div>
                      <button className="mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        Add Region
                      </button>
                    </div>
                  </div>
                  
                  {/* Compliance */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance & Security</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dataStorage.compliance.map((standard) => (
                        <div key={standard} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5 text-green-500" />
                            <div>
                              <h4 className="font-medium text-gray-900">{standard}</h4>
                              <p className="text-sm text-gray-600">Compliant</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Lock className="h-5 w-5 text-blue-500" />
                        <div>
                          <h4 className="font-medium text-blue-900">Encryption</h4>
                          <p className="text-sm text-blue-700">
                            Data encrypted using {dataStorage.encryption} at rest and in transit
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Advanced Tab */}
            {activeTab === 'advanced' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Advanced Settings</h2>
                
                <div className="space-y-8">
                  {/* Performance */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Performance</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Cpu className="h-6 w-6 text-blue-500" />
                          <div>
                            <h4 className="font-medium text-gray-900">Cache Enabled</h4>
                            <p className="text-sm text-gray-600">
                              Improve performance with caching
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setAdvanced(prev => ({ ...prev, cacheEnabled: !prev.cacheEnabled }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            advanced.cacheEnabled ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            advanced.cacheEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      
                      {advanced.cacheEnabled && (
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cache TTL (seconds)
                          </label>
                          <input
                            type="number"
                            min="60"
                            max="86400"
                            value={advanced.cacheTtl}
                            onChange={(e) => setAdvanced(prev => ({ ...prev, cacheTtl: parseInt(e.target.value) }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Cloud className="h-6 w-6 text-blue-500" />
                          <div>
                            <h4 className="font-medium text-gray-900">CDN Enabled</h4>
                            <p className="text-sm text-gray-600">
                              Use Content Delivery Network
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setAdvanced(prev => ({ ...prev, cdnEnabled: !prev.cdnEnabled }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            advanced.cdnEnabled ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            advanced.cdnEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Monitoring */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Monitoring & Logging</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Activity className="h-6 w-6 text-blue-500" />
                          <div>
                            <h4 className="font-medium text-gray-900">Performance Monitoring</h4>
                            <p className="text-sm text-gray-600">
                              Track system performance metrics
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setAdvanced(prev => ({ ...prev, performanceMonitoring: !prev.performanceMonitoring }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            advanced.performanceMonitoring ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            advanced.performanceMonitoring ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="h-6 w-6 text-blue-500" />
                          <div>
                            <h4 className="font-medium text-gray-900">Error Tracking</h4>
                            <p className="text-sm text-gray-600">
                              Capture and report application errors
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setAdvanced(prev => ({ ...prev, errorTracking: !prev.errorTracking }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            advanced.errorTracking ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            advanced.errorTracking ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                      
                      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Logging Level
                        </label>
                        <select
                          value={advanced.loggingLevel}
                          onChange={(e) => setAdvanced(prev => ({ ...prev, loggingLevel: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="debug">Debug</option>
                          <option value="info">Info</option>
                          <option value="warn">Warning</option>
                          <option value="error">Error</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Feature Flags */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Feature Flags</h3>
                    <div className="space-y-3">
                      {Object.entries(advanced.featureFlags).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900 capitalize">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Enable experimental features
                            </p>
                          </div>
                          <button
                            onClick={() => setAdvanced(prev => ({
                              ...prev,
                              featureFlags: {
                                ...prev.featureFlags,
                                [key]: !value
                              }
                            }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                              value ? 'bg-green-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* System Actions */}
                  <div className="border-t border-gray-200 pt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">System Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-left hover:bg-blue-100">
                        <div className="flex items-center gap-3">
                          <RefreshCw className="h-5 w-5 text-blue-600" />
                          <div>
                            <h4 className="font-medium text-blue-900">Clear Cache</h4>
                            <p className="text-sm text-blue-700">Clear all cached data</p>
                          </div>
                        </div>
                      </button>
                      
                      <button className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-left hover:bg-yellow-100">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-yellow-600" />
                          <div>
                            <h4 className="font-medium text-yellow-900">Export Logs</h4>
                            <p className="text-sm text-yellow-700">Download system logs</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modals */}
      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                <button
                  onClick={() => setShowChangePassword(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.current}
                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.new}
                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowChangePassword(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangePassword}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Generate API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Generate API Key</h3>
                <button
                  onClick={() => setShowApiKeyModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={newApiKey.name}
                    onChange={(e) => setNewApiKey({ ...newApiKey, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., Production API"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expires In (days)
                  </label>
                  <select
                    value={newApiKey.expiresIn}
                    onChange={(e) => setNewApiKey({ ...newApiKey, expiresIn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="180">180 days</option>
                    <option value="365">1 year</option>
                    <option value="never">Never</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <p className="text-sm text-yellow-700">
                    Make sure to copy your API key immediately after generating. You won't be able to see it again.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowApiKeyModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerateApiKey}
                  disabled={!newApiKey.name}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Delete Account Modal */}
      {showDeleteAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
                <button
                  onClick={() => setShowDeleteAccount(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <p className="text-sm text-red-700">
                      This action cannot be undone. All your data will be permanently deleted.
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm by typing "DELETE"
                  </label>
                  <input
                    type="text"
                    placeholder="DELETE"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowDeleteAccount(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Account deletion scheduled. You will receive a confirmation email.')
                    setShowDeleteAccount(false)
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={saveSettings}
          className="h-14 w-14 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700"
        >
          <Save className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}

export default SettingsPage