import { useState } from 'react'
import { Role } from '#utils/constants'

export default function useAuth() {
  const [isAuthenticated] = useState(true)
  const [userRoles] = useState<string[]>([Role.admin])

  return { isAuthenticated, userRoles }
}