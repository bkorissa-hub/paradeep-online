import { Navigate } from 'react-router-dom'
import { authUtils } from '../utils/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!authUtils.isLoggedIn()) {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}
