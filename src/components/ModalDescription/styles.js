import styled from "styled-components"

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`

export const ModalContainer = styled.div`
  background-color: #fff;
  padding: 14px;
  width: 500px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  animation: slideYLink 500ms;

  @media (max-width: 735px) {
    width: 90%;
  }

  @keyframes slideYLink {
    0% {
      transform: scale(0);
    }

    60% {
      transform: scale(1.05);
    }

    100% {
      transform: scale(1);
    }
  }
`

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ButtonClose = styled.div`
  border: 0;
  background: none;
  cursor: pointer;
`

export const ContainerButtonsPersonalAds = styled.div`
  display: flex;
  gap: 10px;
`

export const Description = styled.div`
  margin: 14px 0 30px 0;
  color: #111111;
`
