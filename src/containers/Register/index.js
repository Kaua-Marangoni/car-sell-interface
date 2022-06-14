import { yupResolver } from "@hookform/resolvers/yup"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from "yup"

import ImageLogin from "../../assets/image-login.png"
import { Button, ErrorMessage } from "../../components"
import api from "../../services/api"
import { fetchStates, fetchCities } from "../../services/apiIbge"
import { normalizePhoneNumber, normalizeDateBorn } from "../../utils/masks"
import { phoneNumber, birthDate } from "../../utils/validations"
import {
  Container,
  ContainerItems,
  Image,
  H1,
  Label,
  Select,
  Input,
  P
} from "./styles"

export function Register() {
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [formValues, setFormValues] = useState({})

  const navigate = useNavigate()

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
    lastName: Yup.string("Digite um sobrenome válido").required(
      "O sobrenome é obrigatório"
    ),
    birth_date: Yup.string("Digite uma idade válida")
      .matches(birthDate, "Formato de data de nascimento inválida")
      .required("A data de nascimento é obrigatória"),
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
    password: Yup.string("Digite uma senha válida")
      .required("A senha é obrigatória")
      .min(6, "A senha deve ter no mínimo 6 dígitos"),
    confirmPassword: Yup.string("Digite uma senha válida")
      .required("A senha é obrigatória")
      .oneOf([Yup.ref("password")], "As senhas devem ser iguais"),
    allow_show_email: Yup.boolean()
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const numberValue = watch("number")
  const birthDateValue = watch("birth_date")

  useEffect(() => {
    setValue("number", normalizePhoneNumber(numberValue))
    setValue("birth_date", normalizeDateBorn(birthDateValue))
  }, [birthDateValue, numberValue, setValue])

  const onSubmit = async clientData => {
    try {
      toast.loading("Verificando seus dados", {
        duration: 5000
      })
      const { status } = await api.post(
        "users",
        {
          name: clientData.name,
          last_name: clientData.lastName,
          birth_date: clientData.birth_date,
          number: clientData.number,
          email: clientData.email,
          state: clientData.state,
          city: clientData.city,
          password: clientData.password,
          allow_show_email: clientData.allow_show_email
        },
        { validateStatus: () => true }
      )
      if (status === 201 || status === 200) {
        toast.remove()
        toast.success("Cadastro criado com sucesso", {
          duration: 1500
        })

        setTimeout(() => {
          navigate("/login")
        }, 1500)
      } else if (status === 409) {
        toast.remove()
        toast.error("E-mail já cadastrado, faça login para continuar")
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.remove()
      toast.error("Falha no sistema, tente novamente")
    }
  }

  return (
    <Container>
      <Image src={ImageLogin} alt="Imagem Inicial" />

      <ContainerItems>
        <H1>Bem-vindo(a)!</H1>

        <Toaster />

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label>Nome</Label>
          <Input
            type="text"
            placeholder="Digite seu nome"
            {...register("name")}
            error={errors.name?.message}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>

          <Label>Sobrenome</Label>
          <Input
            type="text"
            placeholder="Digite seu sobrenome"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
          <ErrorMessage>{errors.lastName?.message}</ErrorMessage>

          <Label>Data de Nascimento</Label>
          <Input
            type="text"
            placeholder="Ex: 01/01/2000"
            {...register("birth_date")}
            error={errors.birth_date?.message}
          />
          <ErrorMessage>{errors.age?.message}</ErrorMessage>

          <Label>Número</Label>
          <Input
            type="tel"
            placeholder="Digite seu número"
            {...register("number")}
            error={errors.number?.message}
          />
          <ErrorMessage>{errors.number?.message}</ErrorMessage>

          <Label>E-mail</Label>
          <Input
            type="email"
            placeholder="Digite seu e-mail"
            {...register("email")}
            error={errors.email?.message}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

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
                {...register("city")}
                error={errors.city?.message}
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

          <Label>Senha</Label>
          <Input
            type="password"
            placeholder="Digite sua senha"
            {...register("password")}
            error={errors.password?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Label>Confirmar senha</Label>
          <Input
            type="password"
            placeholder="Digite sua senha novamente"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

          <input
            type="checkbox"
            {...register("allow_show_email")}
            id="input-allow-email"
            style={{ width: "16px", margin: "20px 5px 0 0" }}
          />
          <label htmlFor="input-allow-email" style={{ color: "#fff" }}>
            Autorizo exibir meu e-mail nos meus anúncios
          </label>

          <Button type="submit" style={{ margin: "25px 0 10px 0" }}>
            Criar conta
          </Button>
        </form>

        <P>
          Já possui conta? <Link to="/login">Entre agora!</Link>
        </P>
      </ContainerItems>
    </Container>
  )
}
