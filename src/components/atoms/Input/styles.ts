import colors from "@/utils/colors";
import styled from "styled-components";

const InputStyle = {
    Container: styled.input<{width: string}>`
        height: 1.4vh;
        width: ${props => props.width};
        border-radius: 30px;
        padding: 16px;
        padding-left: 3vw;
        background-color: #414141;
        font-size: 20px;
        font-weight: 700;
        border: 2px solid ${colors.transparent};
        color: white;
        &:focus {
            outline: none;
            border-color: ${colors.orange};
        }
    `
}

export default InputStyle;