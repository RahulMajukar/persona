import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  DollarSign, 
  Shield,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  UserPlus,
  Building,
  FileText,
  Calendar,
  Folder,
  MessageSquare,
  BarChart,
  Bell,
  Settings2} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import LogoutModal from './modals/LogoutModal'
import ConfirmModal, { LogoutConfirmation } from './modals/ConfirmModal'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeStep, setActiveStep] = useState(1)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const adminNavItems = [
    { 
      path: '/admin', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      step: 1,
      description: 'Overview and analytics'
    },
    { 
      path: '/admin/users', 
      label: 'User Management', 
      icon: Users,
      step: 2,
      description: 'Manage all users'
    },
    { 
      path: '/admin/teams', 
      label: 'Team Structure', 
      icon: Building,
      step: 3,
      description: 'Organize teams'
    },
    { 
      path: '/admin/permissions', 
      label: 'Permissions', 
      icon: Shield,
      step: 4,
      description: 'Access control'
    },
    { 
      path: '/admin/contacts', 
      label: 'Contact Management', 
      icon: MessageSquare,
      step: 5,
      description: 'Manage contacts'
    },
    { 
      path: '/admin/notifications', 
      label: 'Notifications', 
      icon: Bell,
      step: 6,
      description: 'Notification settings'
    },
    // { 
    //   path: '/admin/analytics', 
    //   label: 'Analytics', 
    //   icon: BarChart,
    //   step: 7,
    //   description: 'Data insights'
    // },
    { 
      path: '/admin/settings', 
      label: 'System Settings', 
      icon: Settings,
      step: 8,
      description: 'Platform configuration'
    },
  ]

  const managerNavItems = [
    { 
      path: '/manager', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      step: 1
    },
    { 
      path: '/manager/team', 
      label: 'My Team', 
      icon: Users,
      step: 2
    },
    { 
      path: '/manager/reports', 
      label: 'Reports', 
      icon: FileText,
      step: 3
    },
    { 
      path: '/manager/calendar', 
      label: 'Calendar', 
      icon: Calendar,
      step: 4
    },
  ]

  const userNavItems = [
    { 
      path: '/user', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      step: 1
    },
    { 
      path: '/user/profile', 
      label: 'My Profile', 
      icon: UserPlus,
      step: 2
    },
    { 
      path: '/user/tasks', 
      label: 'Tasks', 
      icon: Folder,
      step: 3
    },
    { 
      path: '/user/messages', 
      label: 'Messages', 
      icon: MessageSquare,
      step: 4
    },
  ]

  const navItems = user?.role === 'admin' ? adminNavItems : 
                   user?.role === 'manager' ? managerNavItems : userNavItems

  const getCurrentStep = () => {
    const currentItem = navItems.find(item => item.path === location.pathname)
    return currentItem?.step || 1
  }

  const handleLogoutClick = () => {
    setShowLogoutModal(true)
  }

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
    } finally {
      setIsLoggingOut(false)
      setShowLogoutModal(false)
    }
  }

  const handleLogoutCancel = () => {
    setShowLogoutModal(false)
  }

  return (
    <>
      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        userName={user?.name}
        userEmail={user?.email}
        loading={isLoggingOut}
      />

       {/* <LogoutConfirmation
  isOpen={showLogoutModal}
   onClose={() => setShowLogoutModal(false)}
  onConfirm={handleLogoutConfirm}
/> */}

{/* <ConfirmModal
  isOpen={showLogoutModal}
  onClose={handleLogoutCancel}
  onConfirm={handleLogoutConfirm}
  title="Custom Action"
  message="Perform this custom action?"
  icon={Settings2} // Pass any Lucide React icon
  confirmColor="primary"
/> */}

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        fixed md:sticky md:top-0 inset-y-0 left-0 transform h-screen overflow-hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-all duration-300 ease-in-out 
        z-50 ${isCollapsed ? 'w-20' : 'w-80'} 
        bg-gradient-to-b from-gray-900 to-gray-950 text-white
        shadow-2xl border-r border-gray-800
      `}>
        <div className="flex flex-col h-full min-h-screen">
          {/* Header */}
          <div className="p-6 border-b border-gray-800 flex-none">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
                    <Home className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      {user?.role === 'admin' ? 'Admin Panel' : 
                       user?.role === 'manager' ? 'Manager Hub' : 'Workspace'}
                    </h2>
                    <p className="text-xs text-gray-400">v2.4.1</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleSidebar}
                  className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="hidden md:flex p-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* User Info */}
            {!isCollapsed && (
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900"></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{user?.name || 'User'}</p>
                    <p className="text-sm text-gray-400 truncate">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}

            {isCollapsed && (
              <div className="mt-6 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
            )}
          </div>
         

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                              (location.pathname.startsWith(item.path) && item.path !== '/');
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  className={({ isActive }) => `
                    flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} 
                    px-4 py-3 rounded-xl transition-all duration-300 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-primary-500/20 to-primary-600/10 text-primary-300 border-l-4 border-primary-500' 
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white hover:pl-6'
                    }
                    hover:shadow-lg
                  `}
                  onClick={() => {
                    window.innerWidth < 768 && toggleSidebar()
                    setActiveStep(item.step)
                  }}
                  title={isCollapsed ? item.label : ''}
                >
                  <div className={`relative ${isCollapsed ? '' : 'mr-3'}`}>
                    <item.icon className={`h-5 w-5 ${isActive ? 'text-primary-400' : 'text-gray-400 group-hover:text-white'}`} />
                    {getCurrentStep() === item.step && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  {!isCollapsed && (
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.label}</span>
                        {getCurrentStep() === item.step && (
                          <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                      )}
                    </div>
                  )}
                </NavLink>
              )
            })}
          </nav>
          {/* Footer */}
          <div className="p-4 border-t border-gray-800 flex-none">
            <button
              onClick={handleLogoutClick}
              className={`
                flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'} 
                w-full px-4 py-3 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 
                text-gray-300 hover:text-white hover:shadow-lg transition-all duration-300
                group hover:bg-gradient-to-r hover:from-red-900/20 hover:to-red-800/20
                hover:border-l-4 hover:border-red-500
              `}
            >
              <div className={`relative ${isCollapsed ? '' : 'mr-3'}`}>
                <LogOut className="h-5 w-5 group-hover:text-red-400 transition-colors" />
              </div>
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <span className="font-medium group-hover:text-red-300 transition-colors">Logout</span>
                  <p className="text-xs text-gray-400 group-hover:text-red-400/70 transition-colors">Secure sign out</p>
                </div>
              )}
            </button>
            
          </div>
        </div>
      </aside>


      {/* Add CSS for custom scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
      `}</style>
    </>
  )
}

export default Sidebar