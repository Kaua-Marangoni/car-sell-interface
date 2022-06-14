import { yupResolver } from "@hookform/resolvers/yup"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import * as Yup from "yup"

import { Button, ErrorMessage } from "../../components"
import { useUser } from "../../hooks/UserContext"
import api from "../../services/api"
import { fetchStates, fetchCities } from "../../services/apiIbge"
import { normalizePhoneNumber } from "../../utils/masks"
import { phoneNumber } from "../../utils/validations"
import { Container, ContainerItems, H1, Label, Input, Select } from "./styles"

export function EditUser() {
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [formValues, setFormValues] = useState({})

  const navigate = useNavigate()

  const { id } = useParams()
  const { userData, putUserData } = useUser()

  useEffect(() => {
    fetchStates().then(states => setStates(states))
  }, [])

  useEffect(() => {
    fetchCities(formValues.state).then(cities => setCities(cities))
  }, [formValues.state])

  const handleInputChange = event => {
    event.preventDefault()

    const { value, name } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  const schema = Yup.object().shape({
    name: Yup.string("Digite um nome válido").required("O nome é obrigatório"),
    last_name: Yup.string("Digite um sobrenome válido").required(
      "O sobrenome é obrigatório"
    ),
    number: Yup.string("Digite um número válido")
      .matches(phoneNumber, "Formato de celular inválido")
      .required("O número é obrigatório"),
    email: Yup.string()
      .email("Digite um e-mail válido")
      .required("O e-mail é obrigatório"),
    state: Yup.string("Escolha um estado válido").required(
      "O estado é obrigatório"
    ),
    city: Yup.string("Escolha uma cidade válida").required(
      "A cidade é obrigatória"
    ),
    allow_show_email: Yup.boolean()
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    api.get(`users/${id}`).then(response => {
      reset(response.data)
    })
  }, [id, reset])

  const numberValue = watch("number")

  useEffect(() => {
    setValue("number", normalizePhoneNumber(numberValue))
  }, [numberValue, setValue])

  const onSubmit = async clientData => {
    try {
      toast.loading("Atualizando usuário", {
        duration: 5000
      })

      const { data } = await api.put(`users/${id}`, {
        name: clientData.name,
        last_name: clientData.last_name,
        email: userData.email,
        birth_date: userData.birth_date,
        number: clientData.number,
        state: clientData.state,
        city: clientData.city,
        allow_show_email: clientData.allow_show_email
      })

      putUserData(data)

      toast.remove()
      toast.success("Usuário atualizado com sucesso", {
        duration: 2000
      })

      setTimeout(() => {
        navigate("/minha-conta")
      }, 1500)
    } catch (err) {
      toast.remove()
      toast.error("Falha no sistema, tente novamente")
    }
  }

  return (
    <Container>
      <ContainerItems>
        <H1>Edite seu Usuário</H1>

        <Toaster />

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <span>
            <Label>Nome</Label>
            <Input
              type="text"
              placeholder="Digite seu nome"
              {...register("name")}
              error={errors.name?.message}
            />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </span>

          <span>
            <Label>Sobrenome</Label>
            <Input
              type="text"
              placeholder="Digite seu sobrenome"
              {...register("last_name")}
              error={errors.last_name?.message}
            />
            <ErrorMessage>{errors.last_name?.message}</ErrorMessage>
          </span>

          <span>
            <Label>Número</Label>
            <Input
              type="tel"
              placeholder="Digite seu número"
              {...register("number")}
              error={errors.number?.message}
            />
            <ErrorMessage>{errors.number?.message}</ErrorMessage>
          </span>

          <span>
            <Label>Estado</Label>
            <Select
              id="state"
              name="state"
              {...register("state")}
              error={errors.state?.message}
              onChange={handleInputChange}
            >
              <option value="">Selecione seu estado</option>
              {states &&
                states.map(state => {
                  const { sigla, nome } = state
                  return (
                    <option key={sigla} value={sigla}>
                      {nome}
                    </option>
                  )
                })}
            </Select>
            <ErrorMessage>{errors.state?.message}</ErrorMessage>
            {cities.length > 0 && (
              <>
                <Label>Cidade</Label>
                <Select
                  id="city"
                  name="city"
                  error={errors.city?.message}
                  {...register("city")}
                >
                  <option value="">Selecione sua cidade</option>
                  {cities &&
                    cities.map(city => {
                      const { id, nome } = city
                      return (
                        <option key={id} value={nome}>
                          {nome}
                        </option>
                      )
                    })}
                </Select>
                <ErrorMessage>{errors.city?.message}</ErrorMessage>
              </>
            )}
          </span>

          <span>
            <input
              type="checkbox"
              {...register("allow_show_email")}
              id="input-allow-email"
              style={{ width: "16px", margin: "20px 5px 0 0" }}
            />
            <label htmlFor="input-allow-email" style={{ color: "#fff" }}>
              Autorizo exibir meu e-mail nos meus anúncios
            </label>
          </span>

          <span>
            <Button type="submit" style={{ "max-width": 500 }}>
              Atualizar Conta
            </Button>
          </span>
        </form>
      </ContainerItems>
    </Container>
  )
}
