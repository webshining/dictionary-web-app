import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        user-select: none;
    }

    body {
        width: 100dvw;
        height: 100dvh;
        
        color: #4A4A4A;
        background: #DAEBF6;
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
