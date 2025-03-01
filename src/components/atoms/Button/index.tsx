import { memo, useState } from "react";
import Buttons from "./styles";

interface Props {
    text: string;
    width: string;
    onClick: () => void;
};

const Button = ({
    text,
    width,
    onClick
}: Props) => {

    const [hover, setHover] = useState<boolean>(false);

    return (
        <Buttons.Container
            width={width}
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <Buttons.Label hover={hover}>{text}</Buttons.Label>
        </Buttons.Container>
    );
};

export default memo(Button);