import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { Header, Footer } from "../components"
import {
  Home,
  Login,
  Register,
  CarRegister,
  EditVehicle,
  MyAds,
  MyFavorites,
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
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="meus-anuncios"
          element={
            <PrivateRoute>
              <Header />
              <MyAds />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="editar-veiculo/:id"
          element={
            <PrivateRoute>
              <Header />
              <EditVehicle />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="pesquisar-veiculo"
          element={
            <PrivateRoute>
              <Header />
              <Search />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="meus-favoritos"
          element={
            <PrivateRoute>
              <Header />
              <MyFavorites />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="minha-conta"
          element={
            <PrivateRoute>
              <Header />
              <MyAccount />
              <Footer />
            </PrivateRoute>
          }
        />
        <Route
          path="editar-usuario/:id"
          element={
            <PrivateRoute>
              <Header />
              <EditUser />
              <Footer />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default RoutesApp
