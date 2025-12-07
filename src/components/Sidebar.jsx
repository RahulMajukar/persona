import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  DollarSign, 
  Shield,
  LogOut,
  Menu
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth()

  const adminNavItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/teams', label: 'Teams', icon: Users },
    { path: '/admin/permissions', label: 'Permissions', icon: Shield },
    { path: '/admin/salary', label: 'Salary Management', icon: DollarSign },
  ]

  const managerNavItems = [
    { path: '/manager', label: 'Dashboard', icon: LayoutDashboard },
  ]

  const userNavItems = [
    { path: '/user', label: 'Dashboard', icon: LayoutDashboard },
  ]

  const navItems = user?.role === 'admin' ? adminNavItems : 
                   user?.role === 'manager' ? managerNavItems : userNavItems

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`
        fixed md:static inset-y-0 left-0 transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-200 ease-in-out 
        z-30 w-64 bg-gray-900 text-white
      `}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {user?.role === 'admin' ? 'Admin Panel' : 
                 user?.role === 'manager' ? 'Manager Panel' : 'Workspace'}
              </h2>
              <button 
                onClick={toggleSidebar}
                className="md:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-400">{user?.email}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800'
                  }
                `}
                onClick={() => window.innerWidth < 768 && toggleSidebar()}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <button
              onClick={logout}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 w-full"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar