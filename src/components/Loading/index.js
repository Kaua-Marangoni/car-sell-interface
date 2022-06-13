import PropTypes from "prop-types"
import React from "react"

import LoadingGif from "../../assets/loading-unscreen.gif"
import { LoadingSpinner } from "./styles"

export const Loading = ({ isVehicle }) => {
  return (
    <>
      {isVehicle ? (
        <img src={LoadingGif} alt="Gif Loading" />
      ) : (
        <LoadingSpinner></LoadingSpinner>
      )}
    </>
  )
}

Loading.propTypes = {
  isVehicle: PropTypes.bool
}
