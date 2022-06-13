import PropTypes from "prop-types"
import React from "react"

import { ErrorMessageStyles } from "./styles"

export const ErrorMessage = ({ children }) => {
  return <ErrorMessageStyles>{children}</ErrorMessageStyles>
}

ErrorMessage.propTypes = {
  children: PropTypes.string
}
