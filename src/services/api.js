import axios from "axios"

const apiCarSell = axios.create({
  baseURL: "https://teste-database-car-sell-production.up.railway.app"
})

apiCarSell.interceptors.request.use(async config => {
  const userData = await localStorage.getItem("car-sell:userData")
  const token = userData && JSON.parse(userData).token
  config.headers.authorization = `Bearer ${token}`

  return config
})

export default apiCarSell
