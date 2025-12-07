import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Activity,
  Target,
  Award
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const ManagerDashboard = () => {
  const stats = [
    {
      title: 'Team Members',
      value: '12',
      change: '+2',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Team Salary',
      value: '$256,000',
      change: '+8%',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Avg Performance',
      value: '4.2/5',
      change: '+0.3',
      icon: Target,
      color: 'bg-purple-500'
    },
    {
      title: 'This Month',
      value: 'Oct 2024',
      change: 'Current',
      icon: Calendar,
      color: 'bg-orange-500'
    }
  ]

  const teamMembers = [
    { name: 'John Doe', role: 'Senior Developer', performance: 4.5, salary: '$85,000' },
    { name: 'Mike Johnson', role: 'Frontend Developer', performance: 4.2, salary: '$75,000' },
    { name: 'Sarah Wilson', role: 'Backend Developer', performance: 4.0, salary: '$78,000' },
    { name: 'Tom Brown', role: 'QA Engineer', performance: 3.8, salary: '$65,000' },
    { name: 'Emma Davis', role: 'DevOps Engineer', performance: 4.3, salary: '$82,000' }
  ]

  const chartData = {
    labels: teamMembers.map(member => member.name),
    datasets: [
      {
        label: 'Performance Rating',
        data: teamMembers.map(member => member.performance),
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
        text: 'Team Performance'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5
      }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, Jane Smith! Here's your team overview.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Activity className="h-4 w-4" />
          <span>Last updated: Today, 11:45 AM</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Team Members */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h3>
          <Bar data={chartData} options={chartOptions} />
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
            <button className="btn-primary text-sm">View All</button>
          </div>
          
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="font-semibold text-primary-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end">
                    <Award className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{member.performance}/5</span>
                  </div>
                  <p className="text-sm text-gray-600">{member.salary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Team Activities</h3>
        <div className="space-y-4">
          {[
            { user: 'John Doe', action: 'Completed project milestone', time: '2 hours ago' },
            { user: 'Mike Johnson', action: 'Submitted performance review', time: '4 hours ago' },
            { user: 'Sarah Wilson', action: 'Updated project documentation', time: '1 day ago' },
            { user: 'Tom Brown', action: 'Fixed critical bug', time: '2 days ago' },
            { user: 'Emma Davis', action: 'Deployed new features', time: '3 days ago' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </span>
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
  )
}

export default ManagerDashboard