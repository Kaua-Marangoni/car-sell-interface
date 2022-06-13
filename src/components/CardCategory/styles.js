import styled from "styled-components"

export const ItemsCategory = styled.div`
  width: 100%;
  background: #bdc3c7;
  border: ${props => (props.isActiveCategory ? "3px solid #5c95ff" : "none")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    img {
      transform: scale(1.2);
    }
  }
`

export const CategoryImage = styled.img`
  transition: all 150ms;
  width: 40%;
`

export const CategoryName = styled.p`
  position: absolute;
  bottom: 5px;
`
