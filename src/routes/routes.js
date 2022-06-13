import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { Header } from "../components"
import {
  Home,
  Login,
  Register,
  CarRegister,
  EditVehicle,
  MyAds,
  MyAccount,
  EditUser,
  Search
} from "../containers"
import PrivateRoute from "./private-route"

const RoutesApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route
          path="anunciar"
          element={
            <PrivateRoute>
              <Header />
              <CarRegister />
            </PrivateRoute>
          }
        />
        <Route
          path="meus-anuncios"
          element={
            <PrivateRoute>
              <Header />
              <MyAds />
            </PrivateRoute>
          }
        />
        <Route
          path="editar-veiculo/:id"
          element={
            <PrivateRoute>
              <Header />
              <EditVehicle />
            </PrivateRoute>
          }
        />
        <Route
          path="pesquisar-veiculo"
          element={
            <PrivateRoute>
              <Header />
              <Search />
            </PrivateRoute>
          }
        />
        <Route
          path="minha-conta"
          element={
            <PrivateRoute>
              <Header />
              <MyAccount />
            </PrivateRoute>
          }
        />
        <Route
          path="editar-usuario/:id"
          element={
            <PrivateRoute>
              <Header />
              <EditUser />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default RoutesApp
