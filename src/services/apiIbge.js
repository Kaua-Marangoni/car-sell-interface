const BASE_URL = "https://servicodados.ibge.gov.br/api/v1"

export const fetchStates = async () => {
  const url = `${BASE_URL}/localidades/estados`

  return await fetch(url, { cache: "force-cache" }).then(response =>
    response.json()
  )
}

export const fetchCities = async state => {
  if (!state) return Promise.resolve([])
  const url = `${BASE_URL}/localidades/estados/${state}/municipios`

  return await fetch(url, { cache: "force-cache" }).then(response =>
    response.json()
  )
}
