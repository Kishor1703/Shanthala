const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '')

export function getApiUrl(path) {
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export async function apiFetch(path, options = {}) {
  const response = await fetch(getApiUrl(path), options)
  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const message = typeof data === 'string' ? data : data?.message
    throw new Error(message || 'Request failed')
  }

  return data
}

export function getAuthToken() {
  return localStorage.getItem('shanthala_admin_token') || ''
}

export function setAuthToken(token) {
  localStorage.setItem('shanthala_admin_token', token)
}

export function clearAuthToken() {
  localStorage.removeItem('shanthala_admin_token')
}

export function getAuthHeaders(extraHeaders = {}) {
  const token = getAuthToken()
  return token
    ? { ...extraHeaders, Authorization: `Bearer ${token}` }
    : { ...extraHeaders }
}
