import colors from "@/utils/colors";
import styled from "styled-components";

const Message = {
    Container: styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2vh;
    `,
    TextMessage: styled.h2`
        font-size: 24px;
        font-weight: 700;
        color: ${colors.white};
    `
}

export default Message;