import { useState, useEffect } from 'react'
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Shield,
  Calendar,
  Activity
} from 'lucide-react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { userService, salaryService } from '../../services/api'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSalary: 0,
    activeTeams: 0,
    currentMonth: new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
  })
  const [recentActivities, setRecentActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [users, salaries, analytics] = await Promise.all([
        userService.getAll(),
        salaryService.getAll(),
        salaryService.getAnalytics()
      ])

      setStats({
        totalUsers: users.length,
        totalSalary: analytics.totalSalary ? `$${analytics.totalSalary.toLocaleString()}` : '$0',
        activeTeams: 5, // You'll need to fetch this from teams API
        currentMonth: new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
      })

      // Mock recent activities - replace with real API when available
      setRecentActivities([
        { user: 'John Doe', action: 'Updated salary', time: '2 min ago', type: 'update' },
        { user: 'Jane Smith', action: 'Created new team', time: '15 min ago', type: 'create' },
        { user: 'Mike Johnson', action: 'Assigned permissions', time: '1 hour ago', type: 'assign' },
        { user: 'Sarah Wilson', action: 'Deleted user', time: '2 hours ago', type: 'delete' },
        { user: 'Tom Brown', action: 'Updated profile', time: '3 hours ago', type: 'update' }
      ])
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'User Growth',
        data: [65, 78, 90, 105, 120, 135, 150, 165, 180, 195],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Growth Trend'
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Activity className="h-4 w-4" />
          <span>Last updated: Today, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12% from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-blue-500 bg-opacity-10">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Salary</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalSalary}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8% from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-green-500 bg-opacity-10">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Teams</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.activeTeams}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+2</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-purple-500 bg-opacity-10">
              <Shield className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.currentMonth}</p>
              <div className="text-sm text-gray-500 mt-2">Current</div>
            </div>
            <div className="p-3 rounded-lg bg-orange-500 bg-opacity-10">
              <Calendar className="h-6 w-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Analytics</h3>
          <Bar data={chartData} options={chartOptions} />
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'create' ? 'bg-green-100' :
                    activity.type === 'update' ? 'bg-blue-100' :
                    activity.type === 'delete' ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    <Activity className={`h-4 w-4 ${
                      activity.type === 'create' ? 'text-green-600' :
                      activity.type === 'update' ? 'text-blue-600' :
                      activity.type === 'delete' ? 'text-red-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard