import styled from "styled-components"

export const ContainerButton = styled.button`
  width: 100%;
  height: 48px;
  background: #5c95ff;
  color: #fff;
  font-weight: 700;
  font-size: 1em;
  border: none;
  outline: none;
  border-radius: 5px;
  transition: all 150ms;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`
