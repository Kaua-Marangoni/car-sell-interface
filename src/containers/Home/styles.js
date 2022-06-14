import styled from "styled-components"

export const Container = styled.div`
  background: url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/9d7f16cc-de5c-4a6c-9264-9eff241c45d2/d2u0xn1-7e03333a-4d03-46b5-80cb-23a535ca28a3.png/v1/fill/w_1131,h_707,q_70,strp/carbon_fibre_wallpaper_pack_by_bodenm_d2u0xn1-pre.jpg");

  min-height: calc(100vh - 60px);
  padding: 0 20px 50px 20px;

  h1 {
    color: #fff;
    text-align: center;
    padding: 40px 0;
  }
`

export const ContainerCategory = styled.div`
  width: 100%;
  overflow: auto;
  overflow-y: hidden;
  height: 150px;
  position: relative;
  padding: 0 50px;
  display: flex;
  gap: 20px;
  justify-content: space-around;

  @media (max-width: 750px) {
    height: auto;
    display: flexbox;
    padding: 0;
  }
`

export const ContainerCars = styled.div`
  width: 100%;
  position: relative;
  padding: 0 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: space-around;

  @media (max-width: 520px) {
    padding: 0;
  }
`

export const InfoCar = styled.p`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 18px;
  margin-bottom: 1px;
`
