import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import InputStyle from "./styles";

interface Props {
    value: string;
    placeholder: string;
    onChange: (event:  ChangeEvent<HTMLInputElement>) => void;
    type: HTMLInputTypeAttribute | undefined;
    width: string;
}
const Input = ({    
    value,
    placeholder,
    type,
    width,
    onChange
}: Props) => {

    return (
        <InputStyle.Container
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            type={type}
            width={width}
        />
    )
}

export default Input;