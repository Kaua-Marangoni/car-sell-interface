import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: 'Ubuntu', sans-serif;

    &::-webkit-scrollbar {
      width: 12px;
    }

    &::-webkit-scrollbar-track {
      background: #ffffff99;
      border-radius: 20px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #5c95ff;
      border-radius: 15px;
      border: 3px solid #ffffff99;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #5f8ada;
    }

    &::-webkit-scrollbar-thumb:active {
      background-color: #417eee;
    }
  }
`
