import React from "react"
import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"

import { useUser } from "../../hooks/UserContext"
import { Container, P, ContainerContact, DivIcons, Link } from "./styles"

export const Footer = () => {
  const { userData } = useUser()

  return (
    <Container>
      <P>&copy; 2022 Car Sell. Todos os direitos reservados.</P>

      <ContainerContact>
        <P>Precisando de ajuda? Entre em contato</P>
        <DivIcons>
          <Link
            href={`https://api.whatsapp.com/send?phone=5548996647887&text=Olá,%20meu%20nome%20é%20${userData.name}.%20Preciso%20de%20ajuda%20com%20o%20Car%20Sell.`}
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp className="icon-whatsapp" />
          </Link>

          <Link
            href="https://www.instagram.com/kaua_marangoni/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram className="icon-instagram" />
          </Link>

          <Link
            href="https://www.linkedin.com/in/kaua-marangoni/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin className="icon-linkedin" />
          </Link>

          <Link
            href="https://github.com/Kaua-Marangoni/"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub className="icon-github" />
          </Link>
        </DivIcons>
      </ContainerContact>
    </Container>
  )
}
