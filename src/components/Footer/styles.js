import styled from "styled-components"

export const Container = styled.footer`
  width: 100%;
  height: 100%;
  padding: 15px 10px;
  background: #5c95ff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 15px;

  @media (max-width: 645px) {
    flex-direction: column;
    gap: 30px;
  }
`

export const P = styled.p`
  text-align: center;
`

export const ContainerContact = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  gap: 8px;

  .icon-whatsapp,
  .icon-instagram,
  .icon-linkedin,
  .icon-github {
    font-size: 25px;
    cursor: pointer;
  }
`

export const DivIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`

export const Link = styled.a`
  text-decoration: none;
  color: #fff;
  transition: all 150ms;

  &:hover {
    opacity: 0.8;
  }
`
