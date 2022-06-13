import React, { useEffect, useState } from "react"

import { CardVehicle, Loading } from "../../components"
import { useUser } from "../../hooks/UserContext"
import api from "../../services/api"
import formatNumber from "../../utils/formatNumber"
import { Container, ContainerCars, InfoCar } from "./styles"

export function MyAds() {
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [loadingCars, setLoadingCars] = useState(true)

  const { userData } = useUser()

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

  useEffect(() => {
    const newFilteredCars = cars.filter(
      car => car.user_email === userData.email
    )

    setFilteredCars(newFilteredCars)
  }, [cars, userData.email])

  return (
    <Container>
      <h1>Meus Anúncios</h1>

      <ContainerCars>
        {!loadingCars ? (
          filteredCars.map(car => (
            <CardVehicle
              key={car.id}
              car={car}
              filteredCars={filteredCars}
              setCars={setCars}
              myAds
            />
          ))
        ) : (
          <Loading isVehicle />
        )}

        {!filteredCars.length && !loadingCars && (
          <InfoCar style={{ color: "#fff", fontWeight: "700" }}>
            Ops... Você não anunciou nenhum veículo ainda
          </InfoCar>
        )}
      </ContainerCars>
    </Container>
  )
}
