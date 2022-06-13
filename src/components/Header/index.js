import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import HeaderImage from "../../assets/image-header.png"
import { useUser } from "../../hooks/UserContext"
import calcAge from "../../utils/getAge"
import {
  Container,
  ImageHeader,
  SearchIcon,
  UserIcon,
  ModalUser,
  Ul,
  LogoutIcon,
  ContainerText,
  TextHeader,
  DivSearch
} from "./styles"

export const Header = () => {
  const navigate = useNavigate()
  const { logout, userData } = useUser()
  const [modalUser, setModalUser] = useState(false)

  const logoutUser = () => {
    logout()
    navigate("/login")
    window.location.reload()
  }

  const goPageVehicleRegister = () => {
    if (calcAge(userData.birth_date) >= 18) {
      navigate("/anunciar")
    } else {
      toast.error("Você não pode anunciar um veículo porque é menor de idade")
    }
  }

  return (
    <Container>
      <Toaster />

      <ImageHeader
        src={HeaderImage}
        alt="Imagem do Menu"
        onClick={() => navigate("/")}
      />

      <DivSearch onClick={() => navigate("../pesquisar-veiculo")}>
        <SearchIcon />
        <TextHeader>
          {window.innerWidth > 940 ? "Pesquisar por veículos" : ""}
        </TextHeader>
      </DivSearch>

      <ContainerText style={{ justifyContent: "end" }}>
        {userData.name ? (
          <>
            <div
              className="div-user"
              onClick={() =>
                modalUser ? setModalUser(false) : setModalUser(true)
              }
            >
              <UserIcon />
              <TextHeader>Olá, {userData.name}</TextHeader>
            </div>
            {modalUser && (
              <ModalUser>
                <Ul>
                  <li onClick={goPageVehicleRegister}>Anunciar</li>
                  <li onClick={() => navigate("/meus-anuncios")}>
                    Meus Anúncios
                  </li>
                  <li onClick={() => navigate("/minha-conta")}>Minha Conta</li>
                </Ul>
              </ModalUser>
            )}
            <div className="line"></div>
            <div className="div-logout" onClick={logoutUser}>
              <TextHeader>Sair</TextHeader>
              <LogoutIcon />
            </div>
          </>
        ) : (
          <TextHeader>
            Faça <span onClick={() => navigate("/login")}>Login</span> ou{" "}
            <span onClick={() => navigate("/cadastro")}>Registre-se</span>
          </TextHeader>
        )}
      </ContainerText>
    </Container>
  )
}
