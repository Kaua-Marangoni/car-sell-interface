import React, { useEffect, useState } from "react"

import { CardVehicle, Loading } from "../../components"
import { useUser } from "../../hooks/UserContext"
import api from "../../services/api"
import formatNumber from "../../utils/formatNumber"
import { Container, ContainerCars, InfoCar } from "./styles"

export function MyFavorites() {
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [loadingCars, setLoadingCars] = useState(true)
  const [user, setUser] = useState([])

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
    if (userData.email) {
      const fetchUser = async () => {
        const { data: users } = await api.get("users")

        const newFilteredUser = users.filter(
          user => user.email === userData.email
        )

        setUser(newFilteredUser[0].cars_favorites)
      }

      fetchUser()
    }
  }, [userData.email, user.cars_favorites])

  useEffect(() => {
    const newFilteredCars = cars.filter(car => user.includes(car.id))

    setFilteredCars(newFilteredCars)
  }, [cars, user])

  return (
    <Container>
      <h1>Meus Favoritos</h1>

      <ContainerCars>
        {!loadingCars ? (
          filteredCars.map(car => (
            <CardVehicle
              key={car.id}
              car={car}
              filteredCars={filteredCars}
              setCars={setCars}
            />
          ))
        ) : (
          <Loading isVehicle />
        )}

        {!filteredCars.length && !loadingCars && (
          <InfoCar style={{ color: "#fff", fontWeight: "700" }}>
            Ops... Você não possui nenhum veículo favorito
          </InfoCar>
        )}
      </ContainerCars>
    </Container>
  )
}
