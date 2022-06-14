import { MdPersonOutline, MdLogout, MdSearch } from "react-icons/md"
import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 10px;
  overflow: auto;
  background: #5c95ff;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;

  border: none;
  outline: none;
`

export const ImageHeader = styled.img`
  width: 100px;
  cursor: pointer;

  @media (max-width: 450px) {
    width: 60px;
  }
`

export const SearchIcon = styled(MdSearch)`
  font-size: 25px;
`

export const DivSearch = styled.div`
  height: 40px;
  margin: 0 50px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: #dbdbdb;
  color: #000;
  transition: all 150ms;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`

export const UserIcon = styled(MdPersonOutline)`
  font-size: 30px;

  @media (max-width: 450px) {
    display: none;
  }
`

export const LogoutIcon = styled(MdLogout)`
  font-size: 25px;
  margin-left: 5px;

  @media (max-width: 450px) {
    display: none;
  }
`

export const ContainerText = styled.div`
  display: flex;
  color: #fff;
  align-items: center;

  .div-user {
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }

  .div-logout {
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }

  .line {
    height: 30px;
    border: 1px solid #fff;
    margin: 0 10px;
  }
`

export const TextHeader = styled.div`
  font-size: 17px;

  span {
    font-weight: bold;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 940px) {
    font-size: 14px;
  }
`

export const ModalUser = styled.div`
  width: 190px;
  height: 120px;
  top: 59px;
  right: 0;
  position: absolute;
  background-color: #5c95ff;
  animation: slideYModal 500ms;
  animation-direction: alternate;
  overflow: hidden;

  @keyframes slideYModal {
    from {
      height: 0;
    }

    to {
      height: 120px;
    }
  }

  @media (max-width: 450px) {
    width: 100%;
    right: 0;
  }
`

export const Ul = styled.ul`
  height: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 100%;
    width: 100%;
    transition: all 150ms;

    &:hover {
      background-color: #5c95cc;
    }
  }
`
