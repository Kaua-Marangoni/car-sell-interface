import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { BiMap } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

import { Button, ModalDescription } from "../../components"
import { useUser } from "../../hooks/UserContext"
import api from "../../services/api"
import formatDate from "../../utils/formatDate"
import {
  Container,
  HeaderCarCard,
  IconHeart,
  IconHeartChecked,
  ItemsCar,
  CarImage,
  CarName,
  CarPrice,
  InfoCar,
  ContainerButtonsPersonalAds,
  OpenDescription
} from "./styles"

export function CardVehicle({ car, filteredCars, setCars, myAds }) {
  const [data, setData] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState([])

  const { userData } = useUser()

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

  const navigate = useNavigate()

  const onlyNumbers = str => str.replace(/[^0-9]/g, "")

  const deleteVehicle = async carId => {
    Swal.fire({
      title: "Você realmente quer deletar este anúncio?",
      text: "Não será possível reverter isso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar",
      cancelButtonText: "Cancelar"
    }).then(async result => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          title: "Deletando...",
          color: "#fff",
          background: "none",
          showConfirmButton: false,
          timer: 5000
        })
        await api.delete(`cars/${carId}`)

        const carsUpdateFetch = filteredCars.filter(car => car.id !== carId)
        setCars(carsUpdateFetch)

        Swal.fire("Deletado!", "Seu anúncio foi deletado.", "success")
      }
    })
  }

  const handleOpenLink = car => {
    setData(car)
    setShowModal(true)
  }

  const addCar = async carId => {
    await api.put(`users/${userData.id}`, { cars_favorites: [...user, carId] })
    setUser([...user, carId])
    window.location.reload()
  }

  const removeCar = async carId => {
    const carFiltered = user.filter(car => car !== carId)
    await api.put(`users/${userData.id}`, { cars_favorites: carFiltered })
    setUser(carFiltered)
    window.location.reload()
  }

  return (
    <Container>
      <ItemsCar>
        <HeaderCarCard>
          <CarName>
            {car.brand} {car.model}
          </CarName>
          <InfoCar style={{ fontSize: "15px" }}>
            Anunciado em {formatDate(car.createdAt)}
          </InfoCar>
        </HeaderCarCard>

        {car.path && (
          <CarImage src={car.url} alt={`Imagem ${car.brand} ${car.model}`} />
        )}
        <CarPrice>
          {userData.email && (
            <>
              {user.includes(car.id) ? (
                <IconHeartChecked onClick={() => removeCar(car.id)} />
              ) : (
                <IconHeart onClick={() => addCar(car.id)} />
              )}
            </>
          )}
          Preço: R$ {car.price}
        </CarPrice>
        <InfoCar>
          <BiMap style={{ fontSize: 20 }} />
          {car.user_city}, {car.user_state}
        </InfoCar>
        <InfoCar>Versão: {car.version}</InfoCar>
        <InfoCar>Câmbio: {car.gear}</InfoCar>
        <InfoCar>Ano: {car.year}</InfoCar>
        <InfoCar>KM: {car.formatedKm}</InfoCar>

        <OpenDescription onClick={() => handleOpenLink(car)}>
          Mais detalhes
        </OpenDescription>

        {!myAds ? (
          <a
            href={`https://api.whatsapp.com/send?phone=55${onlyNumbers(
              car.user_number
            )}&text=Ol%C3%A1,%20vi%20seu%20an%C3%BAncio%20no%20Car%20Sell.%20Me%20interessei%20pelo%20${
              car.model
            },%20podemos%20conversar%20melhor?`}
            target="_blank"
            rel="noreferrer"
            style={{ width: "100%" }}
          >
            <Button
              style={{
                borderRadius: "0 0 8px 8px"
              }}
            >
              Entrar em contato
            </Button>
          </a>
        ) : (
          <ContainerButtonsPersonalAds>
            <Button
              onClick={() =>
                navigate(`/editar-veiculo/${car.id}`, { state: car })
              }
              style={{ borderRadius: "5px 0 0 5px" }}
            >
              Editar
            </Button>
            <Button
              onClick={() => deleteVehicle(car.id)}
              style={{ background: "#e74c3c", borderRadius: "0 5px 5px 0" }}
            >
              Deletar
            </Button>
          </ContainerButtonsPersonalAds>
        )}
      </ItemsCar>

      {showModal && (
        <ModalDescription
          closeModal={() => setShowModal(false)}
          carData={data}
          myAds={myAds}
          filteredCars={filteredCars}
          setCars={setCars}
          updateVehicle={car =>
            navigate(`/editar-veiculo/${car.id}`, { state: car })
          }
        />
      )}
    </Container>
  )
}

CardVehicle.propTypes = {
  car: PropTypes.object,
  filteredCars: PropTypes.array,
  setCars: PropTypes.func,
  myAds: PropTypes.bool
}
