import { 
  User, 
  Mail, 
  Calendar, 
  DollarSign,
  Award,
  Target,
  TrendingUp,
  FileText
} from 'lucide-react'

const UserDashboard = () => {
  const userInfo = {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Senior Developer',
    team: 'Development Team',
    joinDate: '2024-03-10',
    salary: '$85,000',
    performance: 4.2
  }

  const recentTasks = [
    { task: 'Complete project documentation', status: 'completed', due: '2024-10-15' },
    { task: 'Code review for new feature', status: 'in-progress', due: '2024-10-18' },
    { task: 'Team meeting presentation', status: 'pending', due: '2024-10-20' },
    { task: 'Update project dependencies', status: 'pending', due: '2024-10-22' }
  ]

  const upcomingEvents = [
    { title: 'Team Standup', time: 'Daily, 10:00 AM', type: 'meeting' },
    { title: 'Performance Review', time: 'Oct 25, 2:00 PM', type: 'review' },
    { title: 'Training Session', time: 'Oct 28, 11:00 AM', type: 'training' },
    { title: 'Project Deadline', time: 'Nov 5, 6:00 PM', type: 'deadline' }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {userInfo.name}!</h1>
        <p className="text-gray-600 mt-1">Here's your workspace overview</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - User Info */}
        <div className="lg:col-span-2">
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
              <button className="btn-secondary text-sm">Edit Profile</button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-medium">{userInfo.name}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Email Address</p>
                    <p className="font-medium">{userInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Join Date</p>
                    <p className="font-medium">{userInfo.joinDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Role</p>
                    <p className="font-medium">{userInfo.role}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Team</p>
                    <p className="font-medium">{userInfo.team}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Salary</p>
                    <p className="font-medium">{userInfo.salary}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Tasks</h2>
              <button className="btn-primary text-sm">View All Tasks</button>
            </div>
            
            <div className="space-y-4">
              {recentTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className={`h-2 w-2 rounded-full ${
                      task.status === 'completed' ? 'bg-green-500' :
                      task.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{task.task}</p>
                      <p className="text-sm text-gray-600">Due: {task.due}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Stats and Events */}
        <div>
          {/* Performance Stats */}
          <div className="card mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Overview</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-primary-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Current Rating</span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">{userInfo.performance}</span>
                  <span className="text-gray-600 ml-1">/5.0</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Tasks Completed</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">24</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Projects</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">3</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
            
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{event.title}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      event.type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                      event.type === 'review' ? 'bg-yellow-100 text-yellow-800' :
                      event.type === 'training' ? 'bg-purple-100 text-purple-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{event.time}</p>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 btn-secondary">
              <Calendar className="inline-block mr-2 h-4 w-4" />
              View Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard