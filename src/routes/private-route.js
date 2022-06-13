import PropTypes from "prop-types"
import React from "react"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("car-sell:userData")

  return user ? children : <Navigate to="/login" />
}

export default PrivateRoute

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.node
  ])
}
