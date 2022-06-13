import React, { useEffect, useState } from "react"
import { BsFillPersonFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

import { Button } from "../../components"
import { useUser } from "../../hooks/UserContext"
import api from "../../services/api"
import calcAge from "../../utils/getAge"
import { Container, ContainerUser, ItemsUser, InfoUser } from "./styles"

export function MyAccount() {
  const [user, setUser] = useState([])

  const navigate = useNavigate()
  const { userData } = useUser()

  useEffect(() => {
    const fetchCars = async () => {
      const { data: users } = await api.get("users")

      const newFilteredUser = users
        .filter(user => user.email === userData.email)
        .map(user => {
          return {
            ...user,
            formatedAge: calcAge(userData.birth_date)
          }
        })

      setUser(newFilteredUser[0])
    }

    fetchCars()
  }, [userData.birth_date, userData.email])

  return (
    <Container>
      <h1>Minha Conta</h1>

      <ContainerUser>
        <ItemsUser>
          <BsFillPersonFill style={{ fontSize: 150, marginBottom: 20 }} />

          {user && (
            <>
              <InfoUser>
                Nome: {user.name} {user.last_name}
              </InfoUser>
              <InfoUser>Idade: {user.formatedAge}</InfoUser>
              <InfoUser>E-mail: {user.email}</InfoUser>
              <InfoUser>Número: {user.number}</InfoUser>
              <InfoUser>
                Localidade: {user.city}, {user.state}
              </InfoUser>
              <InfoUser>
                Permite exibir e-mail nos anúncios:{" "}
                {user.allow_show_email ? "Sim" : "Não"}
              </InfoUser>
            </>
          )}

          <Button
            onClick={() => navigate(`/editar-usuario/${user.id}`)}
            style={{ position: "absolute", bottom: 0 }}
          >
            Editar
          </Button>
        </ItemsUser>
      </ContainerUser>
    </Container>
  )
}
