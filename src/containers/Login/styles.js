import styled from "styled-components"

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/9d7f16cc-de5c-4a6c-9264-9eff241c45d2/d2u0xn1-7e03333a-4d03-46b5-80cb-23a535ca28a3.png/v1/fill/w_1131,h_707,q_70,strp/carbon_fibre_wallpaper_pack_by_bodenm_d2u0xn1-pre.jpg");
  display: flex;
  align-items: center;
`

export const ContainerItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px;
  width: 100%;
  justify-content: center;
`

export const Image = styled.img`
  width: 50vw;
`

export const H1 = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  color: #fff;
`

export const Label = styled.p`
  color: #fff;
  margin: 20px 0 3px 0;
`

export const Input = styled.input`
  height: 48px;
  width: 100%;
  font-size: 1em;
  padding-left: 10px;
  border: ${props => (props.error ? "2px solid #cc1717" : "none")};
  outline: none;
  border-radius: 5px;
  background: #dad2d8;
`

export const P = styled.p`
  font-size: 0.9em;
  color: #fff;

  a {
    text-decoration: underline;
    color: #fff;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }
  }
`
