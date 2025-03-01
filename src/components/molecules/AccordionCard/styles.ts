import styled, { keyframes } from "styled-components";
import { FaChevronDown } from "react-icons/fa";
import colors from "@/utils/colors";

const shimmer = keyframes`
  0% {
    background-position: 100% 0;
   
  }
  100% {
    background-position: -100% 0;
  }
`;

const CardAccordion = {
    Container: styled.div`
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        margin-top: 2vh;
    `,
    Header: styled.div<{active: boolean}>`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 16px;
        padding-right: 16px;
        background: ${props => props.active ? colors.orange : colors.gray80};
        cursor: pointer;
        font-weight: bold;
        &:hover {
            background: ${colors.orange};
        }
    `,
    TitleHeader: styled.h3`
        font-size: 16px;
        color: ${colors.white};
    `,
    Icon: styled(FaChevronDown)<{isOpen: boolean}>`
        transition: transform 0.3s ease;
        ${({ isOpen }) => isOpen && "transform: rotate(180deg);"}
    `,
    Content: styled.div<{isOpen: boolean}>`
        max-height: ${({ isOpen }) => (isOpen ? "200px" : "0")};
        overflow: hidden;
        transition: max-height 0.3s ease;
        padding: ${({ isOpen }) => (isOpen ? "16px" : "0")};
        background: white;
    `,
    CardContent: styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 8px;
        margin-top: 1vh;
        background-color: ${colors.lightGrey};
        padding: 16px;

    `,
    ContainerDesc: styled.div`
        diplay: flex;
        flex-direction: column;
        gap: 4px;
    `,
    ContentTitle: styled.h1`
        font-size: 12px;
        font-weight: 700;
        color: ${colors.white};
    `,
    ContentDesc: styled.text`
        font-size: 12px;
        color: ${colors.orange};
    `,
    LoadingCard: styled.div`
        width: 100%;
        height: 12vh;
        border-radius: 10px;
        margin-top: 2vh;
        background: linear-gradient(90deg, ${colors.gray} 25%, ${colors.grey4} 50%, ${colors.gray} 75%);
        background-size: 200% 100%;
        margin-right: 20px;
        animation: ${shimmer} 1s infinite linear;
    `,
    ContainerList: styled.div`
        display: flex;
        flex-direction: column;
        overflow-x: auto;
        max-height: 40vh;
    `
    
}

export default CardAccordion;