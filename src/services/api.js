import axios from "axios"

const apiCarSell = axios.create({
  baseURL: "http://localhost:3000"
})

apiCarSell.interceptors.request.use(async config => {
  const userData = await localStorage.getItem("car-sell:userData")
  const token = userData && JSON.parse(userData).token
  config.headers.authorization = `Bearer ${token}`

  return config
})

export default apiCarSell
