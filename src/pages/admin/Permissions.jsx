import { useState } from 'react'
import { 
  Shield, 
  Check, 
  X, 
  Search,
  Filter,
  Save,
  RefreshCw,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'
import DeleteModal from '../../components/modals/DeleteModal'
import { DeleteConfirmation } from '../../components/modals/ConfirmModal'

const Permissions = () => {
  const [permissions, setPermissions] = useState([
    {
      id: 1,
      name: 'User Management',
      description: 'Can view, create, edit, and delete users',
      roles: {
        admin: ['view', 'create', 'edit', 'delete'],
        manager: ['view'],
        user: []
      }
    },
    {
      id: 2,
      name: 'Team Management',
      description: 'Can manage teams and team members',
      roles: {
        admin: ['view', 'create', 'edit', 'delete'],
        manager: ['view', 'edit'],
        user: []
      }
    },
    {
      id: 3,
      name: 'Salary View',
      description: 'Can view salary information',
      roles: {
        admin: ['view'],
        manager: ['view'],
        user: []
      }
    },
    {
      id: 4,
      name: 'Salary Edit',
      description: 'Can edit salary information',
      roles: {
        admin: ['view', 'edit'],
        manager: [],
        user: []
      }
    },
    {
      id: 5,
      name: 'Reports Access',
      description: 'Can view and generate reports',
      roles: {
        admin: ['view', 'create'],
        manager: ['view'],
        user: []
      }
    }
  ])

  const [userPermissions, setUserPermissions] = useState([
    {
      id: 1,
      user: 'John Doe',
      email: 'john@example.com',
      customPermissions: ['user.view', 'team.view', 'salary.view']
    },
    {
      id: 2,
      user: 'Jane Smith',
      email: 'jane@example.com',
      customPermissions: ['user.view', 'user.edit', 'team.view', 'team.edit']
    }
  ])

  const [deleteModal, setDeleteModal] = useState({ isOpen: false, permissionId: null })
  const [activeTab, setActiveTab] = useState('role-based')

  const togglePermission = (permissionId, role, action) => {
    setPermissions(permissions.map(perm => {
      if (perm.id === permissionId) {
        const rolePerms = [...perm.roles[role]]
        if (rolePerms.includes(action)) {
          return {
            ...perm,
            roles: {
              ...perm.roles,
              [role]: rolePerms.filter(a => a !== action)
            }
          }
        } else {
          return {
            ...perm,
            roles: {
              ...perm.roles,
              [role]: [...rolePerms, action]
            }
          }
        }
      }
      return perm
    }))
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Permissions Management</h1>
          <p className="text-gray-600 mt-1">Manage role-based and user-specific permissions</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button className="btn-secondary flex items-center">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </button>
          <button className="btn-primary flex items-center">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('role-based')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'role-based'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Role-Based Permissions
          </button>
          <button
            onClick={() => setActiveTab('user-specific')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'user-specific'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            User-Specific Permissions
          </button>
        </nav>
      </div>

      {activeTab === 'role-based' ? (
        <>
          {/* Role Permissions Table */}
          <div className="card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Permission</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Description</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Admin</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Manager</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">User</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((permission) => (
                    <tr key={permission.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="font-medium text-gray-900">{permission.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{permission.description}</td>
                      
                      {/* Admin Permissions */}
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          {['view', 'edit', 'delete'].map((action) => (
                            <button
                              key={action}
                              onClick={() => togglePermission(permission.id, 'admin', action)}
                              className={`p-2 rounded ${
                                permission.roles.admin.includes(action)
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                              title={action}
                            >
                              {action === 'view' && <Eye className="h-4 w-4" />}
                              {action === 'edit' && <Edit className="h-4 w-4" />}
                              {action === 'delete' && <Trash2 className="h-4 w-4" />}
                            </button>
                          ))}
                        </div>
                      </td>
                      
                      {/* Manager Permissions */}
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          {['view', 'edit'].map((action) => (
                            <button
                              key={action}
                              onClick={() => togglePermission(permission.id, 'manager', action)}
                              className={`p-2 rounded ${
                                permission.roles.manager.includes(action)
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                              title={action}
                            >
                              {action === 'view' && <Eye className="h-4 w-4" />}
                              {action === 'edit' && <Edit className="h-4 w-4" />}
                            </button>
                          ))}
                        </div>
                      </td>
                      
                      {/* User Permissions */}
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          {['view'].map((action) => (
                            <button
                              key={action}
                              onClick={() => togglePermission(permission.id, 'user', action)}
                              className={`p-2 rounded ${
                                permission.roles.user.includes(action)
                                  ? 'bg-purple-100 text-purple-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                              title={action}
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                          ))}
                        </div>
                      </td>
                      
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            onClick={() => setDeleteModal({ isOpen: true, permissionId: permission.id })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* User-Specific Permissions */}
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 input-field"
                />
              </div>
              <button className="btn-primary flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Assign Permissions
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">User</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Custom Permissions</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userPermissions.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <span className="font-semibold text-primary-600">
                              {user.user.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <p className="font-medium text-gray-900">{user.user}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-2">
                          {user.customPermissions.map((perm, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                            >
                              {perm}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button className="btn-secondary text-sm px-3 py-1">
                            Edit
                          </button>
                          <button className="btn-danger text-sm px-3 py-1">
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <DeleteConfirmation
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, permissionId: null })}
        onConfirm={() => {
          setPermissions(permissions.filter(p => p.id !== deleteModal.permissionId))
          setDeleteModal({ isOpen: false, permissionId: null })
        }}
        itemName={permissions.find(p => p.id === deleteModal.permissionId)?.name}
      />

    </div>
  )
}

export default Permissions