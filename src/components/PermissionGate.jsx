import { useAuth } from '../context/AuthContext'

const PermissionGate = ({ children, permissions, fallback = null }) => {
  const { hasPermission } = useAuth()

  if (permissions.every(permission => hasPermission(permission))) {
    return children
  }

  return fallback
}

export default PermissionGate