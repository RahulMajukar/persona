import { useState } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  MoreVertical
} from 'lucide-react'
import { Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const SalaryMgmt = () => {
  const [salaries] = useState([
    {
      id: 1,
      employee: 'John Doe',
      position: 'Senior Developer',
      department: 'Engineering',
      baseSalary: 85000,
      bonus: 5000,
      total: 90000,
      status: 'active',
      lastReview: '2024-09-15'
    },
    {
      id: 2,
      employee: 'Jane Smith',
      position: 'Product Manager',
      department: 'Product',
      baseSalary: 95000,
      bonus: 8000,
      total: 103000,
      status: 'active',
      lastReview: '2024-10-01'
    },
    {
      id: 3,
      employee: 'Mike Johnson',
      position: 'Marketing Lead',
      department: 'Marketing',
      baseSalary: 75000,
      bonus: 3000,
      total: 78000,
      status: 'active',
      lastReview: '2024-08-20'
    },
    {
      id: 4,
      employee: 'Sarah Wilson',
      position: 'UI/UX Designer',
      department: 'Design',
      baseSalary: 70000,
      bonus: 2000,
      total: 72000,
      status: 'active',
      lastReview: '2024-09-30'
    },
    {
      id: 5,
      employee: 'Tom Brown',
      position: 'Sales Executive',
      department: 'Sales',
      baseSalary: 65000,
      bonus: 15000,
      total: 80000,
      status: 'active',
      lastReview: '2024-10-05'
    }
  ])

  const barData = {
    labels: ['Engineering', 'Product', 'Marketing', 'Design', 'Sales'],
    datasets: [
      {
        label: 'Average Salary',
        data: [85000, 103000, 78000, 72000, 80000],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }
    ]
  }

  const pieData = {
    labels: ['Base Salary', 'Bonus', 'Benefits', 'Allowances'],
    datasets: [
      {
        data: [75, 15, 7, 3],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)'
        ],
        borderWidth: 1
      }
    ]
  }

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Average Salary by Department'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      }
    }
  }

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Salary Composition'
      }
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Salary Management</h1>
          <p className="text-gray-600 mt-1">Manage and analyze employee salaries</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="btn-secondary flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
          <button className="btn-primary flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            Add Salary
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Salary</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">$423,000</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12% from last month</span>
              </div>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Salary</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">$84,600</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8% from last month</span>
              </div>
            </div>
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Highest Salary</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">$103,000</p>
              <div className="text-sm text-gray-600 mt-2">Jane Smith</div>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bonus Paid</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">$33,000</p>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">-5% from last month</span>
              </div>
            </div>
            <DollarSign className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="card">
          <Bar data={barData} options={barOptions} />
        </div>
        <div className="card">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      {/* Salary Table */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Employee Salaries</h3>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search employees..."
                className="pl-10 input-field"
              />
            </div>
            <button className="btn-secondary flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Employee</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Department</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Base Salary</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Bonus</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Total</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Last Review</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {salaries.map((salary) => (
                <tr key={salary.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="font-semibold text-primary-600">
                          {salary.employee.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">{salary.employee}</p>
                        <p className="text-sm text-gray-600">{salary.position}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                      {salary.department}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium">${salary.baseSalary.toLocaleString()}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-medium text-green-600">${salary.bonus.toLocaleString()}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-gray-900">${salary.total.toLocaleString()}</div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{salary.lastReview}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SalaryMgmt