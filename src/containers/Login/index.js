import { yupResolver } from "@hookform/resolvers/yup"
import React from "react"
import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from "yup"

import ImageLogin from "../../assets/image-login.png"
import { Button, ErrorMessage } from "../../components"
import { useUser } from "../../hooks/UserContext"
import api from "../../services/api"
import { Container, ContainerItems, Image, H1, Label, Input, P } from "./styles"

export function Login() {
  const { putUserData } = useUser()

  const navigate = useNavigate()

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Digite um e-mail válido")
      .required("O e-mail é obrigatório"),
    password: Yup.string("Digite uma senha válida")
      .required("A senha é obrigatória")
      .min(6, "A senha deve ter no mínimo 6 dígitos")
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async clientData => {
    try {
      toast.loading("Verificando seus dados", {
        duration: 5000
      })
      const { data } = await api.post("sessions", {
        email: clientData.email,
        password: clientData.password
      })

      putUserData(data)
      toast.remove()
      toast.success(`Bem-vindo(a) ${data.name}`, {
        duration: 1500
      })

      setTimeout(() => {
        navigate("/")
      }, 1500)
    } catch (err) {
      toast.remove()
      toast.error("Verifique seu e-mail e senha", {
        duration: 2000
      })
    }
  }

  return (
    <Container>
      <Image src={ImageLogin} alt="Imagem Inicial" />
      <P
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          cursor: "pointer"
        }}
      >
        Pular
      </P>

      <ContainerItems>
        <H1>Bem-vindo(a) de volta!</H1>

        <Toaster />

        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label>E-mail</Label>
          <Input
            type="email"
            placeholder="Digite seu e-mail"
            {...register("email")}
            error={errors.email?.message}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label>Senha</Label>
          <Input
            type="password"
            placeholder="Digite sua senha"
            {...register("password")}
            error={errors.password?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Button type="submit" style={{ margin: "25px 0 10px 0" }}>
            Entrar
          </Button>
        </form>

        <P>
          Não possui conta? <Link to="/cadastro">Registre-se!</Link>
        </P>
      </ContainerItems>
    </Container>
  )
}
