import { Bell, CheckCircle, X } from 'lucide-react'
import { useState } from 'react'

const NotificationPanel = ({ onClose }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New user registered', message: 'John Doe has joined the platform', time: '2 min ago', read: false },
    { id: 2, title: 'Salary processed', message: 'Monthly payroll completed successfully', time: '15 min ago', read: false },
    { id: 3, title: 'System update', message: 'New features available in dashboard', time: '1 hour ago', read: true },
    { id: 4, title: 'Team invitation', message: 'You have been invited to join Team Alpha', time: '2 hours ago', read: true },
  ])

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })))
  }

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <span className="bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications.filter(n => !n.read).length}
            </span>
          </div>
          <button
            onClick={markAllAsRead}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Mark all read
          </button>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
              !notification.read ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{notification.title}</p>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
              </div>
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="ml-2 p-1 hover:bg-white rounded"
                  title="Mark as read"
                >
                  <CheckCircle className="h-4 w-4 text-gray-400 hover:text-green-500" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-gray-200">
        <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 py-2">
          View all notifications
        </button>
      </div>
      
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded"
      >
        <X className="h-4 w-4 text-gray-500" />
      </button>
    </div>
  )
}

export default NotificationPanel