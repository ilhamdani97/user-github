import colors from "@/utils/colors";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: 100% 0;
   
  }
  100% {
    background-position: -100% 0;
  }
`;

const LayoutHome = {
    Container: styled.div`
        background-color: ${colors.black};
    `,
    TitlePage: styled.h1`
        font-size: 3vh;
        color: ${colors.white};
        text-align: center;
    `,
    ContainerSearch: styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 3vw;
        margin-right: 3vw;
        gap: 2vw;
    `,
    ContainerList: styled.div`
        padding: 3vw;
    `,
    LoadingUser: styled.div`
        width: 90vw;
        height: 10vh;
        border-radius: 10px;
        margin-top: 2vh;
        background: linear-gradient(90deg, ${colors.gray} 25%, ${colors.grey4} 50%, ${colors.gray} 75%);
        background-size: 200% 100%;
        margin-right: 20px;
        animation: ${shimmer} 1s infinite linear;
    `,
    ContainerInfo: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3vh;
        margin-top: 10vh;
        height: 30vh;
    `
}

export default LayoutHome;