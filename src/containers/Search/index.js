import React, { useEffect, useState } from "react"

import { CardVehicle, Loading } from "../../components"
import api from "../../services/api"
import formatNumber from "../../utils/formatNumber"
import {
  Container,
  ContainerSearch,
  SearchIcon,
  InputSearch,
  ContainerCars,
  InfoCar
} from "./styles"

export function Search() {
  const [cars, setCars] = useState([])
  const [search, setSearch] = useState("")
  const [loadingCars, setLoadingCars] = useState(true)

  useEffect(() => {
    const fetchCars = async () => {
      const { data: cars } = await api.get("cars")

      const allCars = cars.map(car => {
        return {
          ...car,
          formatedKm: formatNumber(car.km)
        }
      })

      setCars(allCars)
      setLoadingCars(false)
    }

    fetchCars()
  }, [])

  const lowerSearch = search.toLowerCase()

  const carsFiltered = cars.filter(
    car =>
      car.brand.toLowerCase().includes(lowerSearch) ||
      car.model.toLowerCase().includes(lowerSearch) ||
      car.user_name.toLowerCase().includes(lowerSearch) ||
      car.price.toString().includes(lowerSearch) ||
      car.version.toLowerCase().includes(lowerSearch) ||
      car.gear.toLowerCase().includes(lowerSearch) ||
      car.year.toString().includes(lowerSearch) ||
      car.km.toString().includes(lowerSearch) ||
      car.description.toLowerCase().includes(lowerSearch)
  )

  return (
    <Container>
      <h1>Todos Anúncios</h1>

      <ContainerSearch>
        <SearchIcon />
        <InputSearch
          type="text"
          placeholder="Pesquise por veículos"
          onChange={event => setSearch(event.target.value)}
        />
      </ContainerSearch>

      <ContainerCars>
        {!loadingCars ? (
          carsFiltered.map(car => <CardVehicle key={car.id} car={car} />)
        ) : (
          <Loading isVehicle />
        )}

        {!carsFiltered.length && !loadingCars && (
          <InfoCar style={{ color: "#fff", fontWeight: "700" }}>
            Ops... Nenhum veículo encontrado
          </InfoCar>
        )}
      </ContainerCars>
    </Container>
  )
}
