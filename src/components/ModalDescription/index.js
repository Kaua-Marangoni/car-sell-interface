import PropTypes from "prop-types"
import React, { useState } from "react"
import { FiX } from "react-icons/fi"
import Swal from "sweetalert2"

import { Button } from "../../components"
import api from "../../services/api"
import { Loading } from "../Loading"
import {
  Container,
  ModalContainer,
  ModalHeader,
  ButtonClose,
  ContainerButtonsPersonalAds,
  Description
} from "./styles"

export const ModalDescription = ({
  closeModal,
  carData,
  filteredCars,
  setCars,
  myAds,
  updateVehicle
}) => {
  const [loading, setLoading] = useState(false)

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
        setLoading(true)
        await api.delete(`cars/${carId}`)

        const carsUpdateFetch = filteredCars.filter(car => car.id !== carId)
        closeModal()
        setCars(carsUpdateFetch)
        setLoading(false)

        Swal.fire("Deletado!", "Seu anúncio foi deletado.", "success")
      }
    })
  }

  return (
    <Container>
      {!loading ? (
        <ModalContainer>
          <ModalHeader>
            <h2>
              Descrição {carData.brand} {carData.model} {carData.year}
            </h2>
            <ButtonClose onClick={closeModal}>
              <FiX size={28} color="#000" />
            </ButtonClose>
          </ModalHeader>
          <Description>{carData.description}</Description>
          <Description style={{ marginBottom: 0 }}>
            Anunciado por{" "}
            <span style={{ fontWeight: "bold" }}>{carData.user_name}</span>
          </Description>
          {carData.user_allow_show_email && (
            <Description>
              E-mail do anunciante: {carData.user_email}
            </Description>
          )}

          {!myAds ? (
            <a
              href={`https://api.whatsapp.com/send?phone=55${onlyNumbers(
                carData.user_number
              )}&text=Ol%C3%A1,%20vi%20seu%20an%C3%BAncio%20no%20Car%20Sell.%20Me%20interessei%20pelo%20${
                carData.model
              },%20podemos%20conversar%20melhor?`}
              target="_blank"
              rel="noreferrer"
            >
              <Button>Entrar em contato</Button>
            </a>
          ) : (
            <ContainerButtonsPersonalAds>
              <Button onClick={() => updateVehicle(carData)}>Editar</Button>
              <Button
                onClick={() => deleteVehicle(carData.id)}
                style={{ background: "#e74c3c" }}
              >
                Deletar
              </Button>
            </ContainerButtonsPersonalAds>
          )}
        </ModalContainer>
      ) : (
        <Loading />
      )}
    </Container>
  )
}

ModalDescription.propTypes = {
  closeModal: PropTypes.func,
  carData: PropTypes.object,
  filteredCars: PropTypes.array,
  setCars: PropTypes.func,
  myAds: PropTypes.bool,
  updateVehicle: PropTypes.func
}
