import { useState, useEffect, useMemo } from 'react'
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Shield,
  Calendar,
  Activity,
  Download,
  Filter,
  MoreVertical,
  Bell,
  Search,
  PieChart,
  BarChart3,
  LineChart,
  Target,
  CheckCircle,
  AlertCircle,
  Clock,
  UserPlus,
  CreditCard,
  Building,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { 
  Bar, 
  Line, 
  Pie 
} from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { userService, salaryService } from '../../services/api'
import StatCard from '../../components/StatCard'
import QuickActions from '../../components/QuickActions'
import NotificationPanel from '../../components/NotificationPanel'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSalary: 0,
    activeTeams: 0,
    pendingApprovals: 0,
    avgSalary: 0,
    userGrowth: 0,
    activeUsers: 0,
    budgetUtilization: 0
  })

  const [recentActivities, setRecentActivities] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('monthly')
  const [searchTerm, setSearchTerm] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(3)

  useEffect(() => {
    fetchDashboardData()
    // Simulate real-time updates
    const interval = setInterval(() => {
      fetchUpdates()
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [usersData, salariesData, analyticsData, activitiesData] = await Promise.all([
        userService.getAll(),
        salaryService.getAll(),
        salaryService.getAnalytics(),
        userService.getRecentActivities() // Assuming this endpoint exists
      ])

      const totalSalary = analyticsData.totalSalary || 0
      const avgSalary = salariesData.length > 0 
        ? salariesData.reduce((acc, curr) => acc + curr.amount, 0) / salariesData.length 
        : 0

      setStats({
        totalUsers: usersData.length,
        totalSalary: `$${totalSalary.toLocaleString()}`,
        activeTeams: analyticsData.activeTeams || 5,
        pendingApprovals: analyticsData.pendingApprovals || 12,
        avgSalary: `$${Math.round(avgSalary).toLocaleString()}`,
        userGrowth: analyticsData.userGrowth || 12,
        activeUsers: analyticsData.activeUsers || Math.round(usersData.length * 0.85),
        budgetUtilization: analyticsData.budgetUtilization || 78
      })

      setUsers(usersData.slice(0, 5))
      
      // Use actual activities if available, otherwise mock data
      setRecentActivities(activitiesData || [
        { id: 1, user: 'John Doe', action: 'Updated salary', time: '2 min ago', type: 'update', priority: 'low' },
        { id: 2, user: 'Jane Smith', action: 'Created new team', time: '15 min ago', type: 'create', priority: 'medium' },
        { id: 3, user: 'Mike Johnson', action: 'Assigned permissions', time: '1 hour ago', type: 'assign', priority: 'low' },
        { id: 4, user: 'Sarah Wilson', action: 'Deleted user', time: '2 hours ago', type: 'delete', priority: 'high' },
        { id: 5, user: 'Tom Brown', action: 'Updated profile', time: '3 hours ago', type: 'update', priority: 'low' },
        { id: 6, user: 'Emma Davis', action: 'Submitted salary review', time: '4 hours ago', type: 'submit', priority: 'medium' },
        { id: 7, user: 'Robert Lee', action: 'Joined team Alpha', time: '5 hours ago', type: 'join', priority: 'low' }
      ])
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUpdates = async () => {
    try {
      const updates = await userService.getUpdates()
      // Process real-time updates
      if (updates.newActivities) {
        setRecentActivities(prev => [
          ...updates.newActivities,
          ...prev.slice(0, 6)
        ])
      }
    } catch (error) {
      console.error('Failed to fetch updates:', error)
    }
  }

  const statCards = useMemo(() => [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      change: `${stats.userGrowth}%`,
      changeType: stats.userGrowth >= 0 ? 'increase' : 'decrease',
      icon: Users,
      color: 'blue',
      description: 'Active users in system'
    },
    {
      title: 'Total Salary',
      value: stats.totalSalary,
      change: '+8.2%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'green',
      description: 'Monthly salary expenditure'
    },
    {
      title: 'Active Teams',
      value: stats.activeTeams,
      change: '+2',
      changeType: 'increase',
      icon: Shield,
      color: 'purple',
      description: 'Currently active teams'
    },
    {
      title: 'Pending Approvals',
      value: stats.pendingApprovals,
      change: '-3',
      changeType: 'decrease',
      icon: Clock,
      color: 'orange',
      description: 'Awaiting approval'
    },
    {
      title: 'Avg. Salary',
      value: stats.avgSalary,
      change: '+5.1%',
      changeType: 'increase',
      icon: CreditCard,
      color: 'indigo',
      description: 'Average per employee'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      change: `${Math.round((stats.activeUsers / stats.totalUsers) * 100)}%`,
      changeType: 'increase',
      icon: UserPlus,
      color: 'teal',
      description: 'Currently online'
    }
  ], [stats])

  const userGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Users',
        data: [65, 78, 90, 105, 120, 135, 150, 165, 180, 195, 210, 230],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Active Users',
        data: [50, 60, 75, 85, 95, 110, 125, 140, 155, 170, 185, 200],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const salaryDistributionData = {
    labels: ['< $50k', '$50k-80k', '$80k-120k', '$120k-150k', '> $150k'],
    datasets: [
      {
        data: [15, 30, 35, 15, 5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderWidth: 1
      }
    ]
  }

  const departmentPerformanceData = {
    labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'],
    datasets: [
      {
        label: 'Avg Salary',
        data: [95000, 75000, 65000, 60000, 80000, 70000],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
      {
        label: 'Headcount',
        data: [45, 30, 25, 15, 10, 20],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  const quickActions = [
    { icon: UserPlus, label: 'Add User', action: () => console.log('Add User'), color: 'blue' },
    { icon: CreditCard, label: 'Process Payroll', action: () => console.log('Process Payroll'), color: 'green' },
    { icon: Building, label: 'Create Team', action: () => console.log('Create Team'), color: 'purple' },
    { icon: Download, label: 'Export Data', action: () => console.log('Export Data'), color: 'orange' },
    { icon: Filter, label: 'Filter Reports', action: () => console.log('Filter Reports'), color: 'indigo' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your organization.</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <button 
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-6 w-6" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>
            
            {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
          </div>
          
          <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border border-gray-200">
            <Activity className="h-4 w-4" />
            <span>Updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {/* Time Range Filter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          {['daily', 'weekly', 'monthly', 'yearly'].map((range) => (
            <button
              key={range}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              onClick={() => setTimeRange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
        
        <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Growth Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
              <p className="text-sm text-gray-600">Monthly user acquisition trend</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="h-64">
            <Line data={userGrowthData} options={chartOptions} />
          </div>
        </div>

        {/* Salary Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Salary Distribution</h3>
              <p className="text-sm text-gray-600">Employee salary ranges</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <PieChart className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="h-64">
            <Pie data={salaryDistributionData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Department Performance */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Department Performance</h3>
              <p className="text-sm text-gray-600">Salary vs headcount by department</p>
            </div>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>This Year</option>
              <option>Last Year</option>
              <option>Last Quarter</option>
            </select>
          </div>
          <div className="h-72">
            <Bar data={departmentPerformanceData} options={chartOptions} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <QuickActions actions={quickActions} />
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-4">System Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Health</span>
                <span className="flex items-center text-green-600 text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="flex items-center text-green-600 text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage</span>
                <span className="flex items-center text-yellow-600 text-sm">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  78% Used
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities & Top Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
              <p className="text-sm text-gray-600">Latest system activities</p>
            </div>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    activity.priority === 'high' ? 'bg-red-100' :
                    activity.priority === 'medium' ? 'bg-yellow-100' :
                    'bg-blue-100'
                  }`}>
                    <Activity className={`h-4 w-4 ${
                      activity.priority === 'high' ? 'text-red-600' :
                      activity.priority === 'medium' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.type === 'create' ? 'bg-green-100 text-green-800' :
                    activity.type === 'update' ? 'bg-blue-100 text-blue-800' :
                    activity.type === 'delete' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.type}
                  </span>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top Users</h3>
              <p className="text-sm text-gray-600">Highest paid employees</p>
            </div>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              See All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Name</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Department</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Salary</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 5).map((user, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0">
                    <td className="py-3">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <Users className="h-4 w-4 text-gray-600" />
                        </div>
                        <span className="font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-600">{user.department || 'Engineering'}</td>
                    <td className="py-3">
                      <span className="font-medium text-gray-900">${user.salary?.toLocaleString() || '0'}</span>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status || 'active'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Showing 5 of {stats.totalUsers} users</span>
              <div className="flex items-center space-x-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ArrowDownRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="text-sm opacity-90">Budget Utilization</div>
          <div className="text-2xl font-bold mt-1">{stats.budgetUtilization}%</div>
          <div className="text-sm opacity-90 mt-2">of annual budget</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <div className="text-sm opacity-90">Avg. Response Time</div>
          <div className="text-2xl font-bold mt-1">2.4s</div>
          <div className="text-sm opacity-90 mt-2">API performance</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="text-sm opacity-90">Data Accuracy</div>
          <div className="text-2xl font-bold mt-1">99.8%</div>
          <div className="text-sm opacity-90 mt-2">System reliability</div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <div className="text-sm opacity-90">User Satisfaction</div>
          <div className="text-2xl font-bold mt-1">4.7</div>
          <div className="text-sm opacity-90 mt-2">Out of 5.0</div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard