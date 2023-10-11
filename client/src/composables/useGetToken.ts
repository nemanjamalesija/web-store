export default function useGetJWT() {
  const jwtToken = localStorage.getItem('jwt')
  if (!jwtToken) {
    return null
  }

  return jwtToken
}
