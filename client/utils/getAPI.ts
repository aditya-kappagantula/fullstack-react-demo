const getAPI = async (url: string) => {
  const response = await window.fetch(url)
  const result = await response.json()
  return result
}

export default getAPI
