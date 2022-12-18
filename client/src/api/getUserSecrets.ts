import { API_URL } from './config'

export const getUserSecrets = async () => {
  const response = await fetch(`${API_URL}/secrets`, { credentials: 'include' })

  if (response.status === 401) {
    throw new Error('Authentication Failure')
  } else {
    return response.json()
  }
}
