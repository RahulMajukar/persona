import { useState } from 'react'
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react'
import DeleteModal from '../../components/modals/DeleteModal'
import { DeleteConfirmation } from '../../components/modals/ConfirmModal'

const Teams = () => {
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: 'Development Team',
      manager: 'Jane Smith',
      members: 12,
      department: 'Engineering',
      status: 'active',
      created: '2024-01-15'
    },
    {
      id: 2,
      name: 'Marketing Team',
      manager: 'Tom Brown',
      members: 8,
      department: 'Marketing',
      status: 'active',
      created: '2024-02-10'
    },
    {
      id: 3,
      name: 'Sales Team',
      manager: 'Mike Johnson',
      members: 10,
      department: 'Sales',
      status: 'active',
      created: '2024-01-20'
    },
    {
      id: 4,
      name: 'Design Team',
      manager: 'Sarah Wilson',
      members: 6,
      department: 'Design',
      status: 'inactive',
      created: '2024-03-01'
    }
  ])

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, teamId: null })
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDeleteTeam = (teamId) => {
    setTeams(teams.filter(team => team.id !== teamId))
    setDeleteModal({ isOpen: false, teamId: null })
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teams Management</h1>
          <p className="text-gray-600 mt-1">Create and manage teams in your organization</p>
        </div>
        <button 
          className="btn-primary flex items-center mt-4 sm:mt-0"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="mr-2 h-5 w-5" />
          Create Team
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Teams</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{teams.length}</p>
            </div>
            <Users className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Teams</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {teams.filter(t => t.status === 'active').length}
              </p>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <Users className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {teams.reduce((acc, team) => acc + team.members, 0)}
              </p>
            </div>
            <UserPlus className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {[...new Set(teams.map(t => t.department))].length}
              </p>
            </div>
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search teams..."
              className="pl-10 input-field"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-4">
            <select className="input-field">
              <option value="">All Departments</option>
              <option value="engineering">Engineering</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="design">Design</option>
            </select>
            <select className="input-field">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="btn-secondary flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <div key={team.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                <p className="text-sm text-gray-600">{team.department}</p>
              </div>
              <div className="flex items-center space-x-1">
                <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                  onClick={() => setDeleteModal({ isOpen: true, teamId: team.id })}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Manager</span>
                <span className="font-medium">{team.manager}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Members</span>
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="font-medium">{team.members}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  team.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {team.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Created</span>
                <span className="font-medium">{team.created}</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button className="btn-secondary w-full text-sm">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <DeleteConfirmation
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, teamId: null })}
        onConfirm={() => handleDeleteTeam(deleteModal.teamId)}
        itemName={teams.find(t => t.id === deleteModal.teamId)?.name} 
      />
    </div>
  )
}

export default Teams