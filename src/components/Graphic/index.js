import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"

import { ChartGraphic } from "./styles"

export const Graphic = ({ cars }) => {
  const [carsCategory, setCarsCategory] = useState(0)
  const [motorcycleCategory, setMotorcycleCategory] = useState(0)
  const [trucksCategory, setTruckCategory] = useState(0)
  const [othersCategory, setOthersCategory] = useState(0)

  useEffect(() => {
    const fetchNumberVehicles = () => {
      const carsCategory = cars.filter(car => car.category.name === "Carros")
      setCarsCategory(carsCategory.length)
      const motorcycleCategory = cars.filter(
        car => car.category.name === "Motos"
      )
      setMotorcycleCategory(motorcycleCategory.length)
      const trucksCategory = cars.filter(
        car => car.category.name === "Caminhões"
      )
      setTruckCategory(trucksCategory.length)
      const othersCategory = cars.filter(car => car.category.name === "Outros")
      setOthersCategory(othersCategory.length)
    }

    fetchNumberVehicles()
  }, [cars])

  const state = {
    series: [carsCategory, motorcycleCategory, trucksCategory, othersCategory],
    options: {
      chart: {
        type: "donut"
      },
      labels: ["Carro", "Moto", "Caminhão", "Outros"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 250
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }
  }

  return (
    <>
      {carsCategory ||
      motorcycleCategory ||
      trucksCategory ||
      othersCategory ? (
        <ChartGraphic
          options={state.options}
          series={state.series}
          type="donut"
          width="300"
        />
      ) : (
        <></>
      )}
    </>
  )
}

Graphic.propTypes = {
  cars: PropTypes.array
}
