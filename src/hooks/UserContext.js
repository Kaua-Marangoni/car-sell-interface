import PropTypes from "prop-types"
import React, { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({})

  const putUserData = async userInfo => {
    setUserData(userInfo)

    await localStorage.setItem("car-sell:userData", JSON.stringify(userInfo))
  }

  const logout = async () => {
    await localStorage.removeItem("car-sell:userData")
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const clientInfo = await localStorage.getItem("car-sell:userData")

      if (clientInfo) {
        setUserData(JSON.parse(clientInfo))
      }
    }

    fetchUserData()
  }, [])

  return (
    <UserContext.Provider value={{ putUserData, userData, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("useUser must be used with UserContext")
  }

  return context
}

UserProvider.propTypes = {
  children: PropTypes.node
}
