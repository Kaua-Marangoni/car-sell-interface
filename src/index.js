import React from "react"
import ReactDOM from "react-dom"

import { UserProvider } from "./hooks/UserContext"
import Routes from "./routes/routes"
import GlobalStyle from "./styles/globalStyle"

ReactDOM.render(
  <>
    <UserProvider>
      <Routes />
    </UserProvider>
    <GlobalStyle />
  </>,
  document.getElementById("root")
)
