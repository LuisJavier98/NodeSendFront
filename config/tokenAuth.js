export const config = (token) => {
  return {
    headers: {
      "Content-Type": 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
}