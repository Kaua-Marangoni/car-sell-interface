import React, { useEffect, useState } from "react"

import {
  Header,
  CardCategory,
  CardVehicle,
  Loading,
  Footer
} from "../../components"
import { Graphic } from "../../components/Graphic"
import api from "../../services/api"
import formatNumber from "../../utils/formatNumber"
import {
  Container,
  ContainerCategory,
  DivGraphic,
  ContainerCars,
  InfoCar
} from "./styles"

export function Home() {
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(0)
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [loadingCars, setLoadingCars] = useState(true)
  const [loadingCategories, setLoadingCategories] = useState(true)

  useEffect(() => {
    const fetchCars = async () => {
      const { data: categories } = await api.get("categories")
      const { data: cars } = await api.get("cars")

      const allCars = cars.map(car => {
        return {
          ...car,
          formatedKm: formatNumber(car.km)
        }
      })

      const newCategories = [
        {
          id: 0,
          name: "Todos",
          path: "all-categories.png",
          url: "https://i.ibb.co/V9dnSWh/all-categories.png"
        },
        ...categories
      ]

      newCategories.sort((x, y) => {
        return x.id - y.id
      })

      setCategories(newCategories)
      setLoadingCategories(false)
      setCars(allCars)
      setLoadingCars(false)
    }

    fetchCars()
  }, [])

  useEffect(() => {
    if (activeCategory === 0) {
      setFilteredCars(cars)
    } else {
      const newFilteredCars = cars.filter(
        product => product.category_id === activeCategory
      )

      setFilteredCars(newFilteredCars)
    }
  }, [activeCategory, cars])

  return (
    <>
      <Header />
      <Container>
        <h1>Categorias</h1>

        <ContainerCategory>
          {!loadingCategories ? (
            categories.map(category => (
              <CardCategory
                key={category.id}
                category={category}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            ))
          ) : (
            <Loading />
          )}
        </ContainerCategory>

        <DivGraphic>
          <h1>Anunciados</h1>
          <Graphic cars={cars} />
        </DivGraphic>

        <ContainerCars>
          {!loadingCars ? (
            filteredCars.map(car => <CardVehicle key={car.id} car={car} />)
          ) : (
            <Loading isVehicle />
          )}

          {!filteredCars.length && !loadingCars && (
            <InfoCar style={{ color: "#fff", fontWeight: "700" }}>
              Ops... Nenhum veículo anunciado ainda
            </InfoCar>
          )}
        </ContainerCars>
      </Container>
      <Footer />
    </>
  )
}
