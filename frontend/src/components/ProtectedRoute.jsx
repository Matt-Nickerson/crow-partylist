import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const userName = localStorage.getItem('userName')
  
  if (!userName || userName.trim() === '') {
    return <Navigate to="/" replace />
  }
  
  return children
}

