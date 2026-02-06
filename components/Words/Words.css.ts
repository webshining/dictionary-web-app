import styled from "styled-components";

export const Content = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 10px;

    padding: 10px;
    overflow-y: auto;
`;

export const WordItem = styled.div`
    display: grid;
    grid-template-columns: 1fr 40px;
    align-items: center;

    button {
        width: 40px;
        height: 40px;

        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const TranslationItem = styled.div`
    display: grid;
    grid-template-columns: 30px 1fr;

    div {
        display: flex;
        align-items: center;
    }
    .translation {
        font-size: 24px;
    }
`;
