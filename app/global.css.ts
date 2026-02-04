import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        width: 100dvw;
        height: 100dvh;
        
        color: ${(props) => props.theme.colors.primary};
        background: ${(props) => props.theme.colors.background};
        overflow: hidden;
    }

    *::-webkit-scrollbar {
        display: none;
        width: 0;
    }

    button {
        cursor: pointer;
        background: none;
        outline: none;
        border: none;
        color: unset;
    }
`;
