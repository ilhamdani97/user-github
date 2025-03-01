import colors from "@/utils/colors";
import styled from "styled-components";

const Buttons = {
    Container: styled.button<{width: string}>`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: ${colors.white};
        height: 1.8vh;
        width: ${props => props.width};
        padding:  20px 36px;
        border-radius: 22px;
        border: 3px solid ${colors.orange};
        cursor: pointer;
        &:hover {
            background-color: ${colors.orange};
            border: 3px solid ${colors.transparent};
        };
    `,
    Label: styled.text <{hover: boolean}>`
        font-size: 16px;
        font-weight: 700;
        color: ${props => props.hover ? colors.white : colors.orange};
    `
};

export default Buttons;