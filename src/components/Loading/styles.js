import styled from "styled-components"

export const LoadingSpinner = styled.div`
  width: 2.5em;
  height: 3em;
  border: 3px solid transparent;
  border-top-color: #5c95ff;
  border-bottom-color: #5c95ff;
  border-radius: 50%;
  animation: spin-stretch 2s ease infinite;
  align-self: center;

  @keyframes spin-stretch {
    50% {
      transform: rotate(360deg) scale(0.4, 0.33);
      border-width: 8px;
    }
    100% {
      transform: rotate(720deg) scale(1, 1);
      border-width: 3px;
    }
  }
`
