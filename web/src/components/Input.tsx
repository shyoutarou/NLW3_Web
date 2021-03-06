import React, {InputHTMLAttributes, useState} from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import '../styles/components/input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>  {
    eye?: string;
    label?: string;
    name: string;
    placeholder?: string;
  }

const Input: React.FC<InputProps> = ({eye, label, name, ...rest}) => 
{
    const [visible, setVisible] = useState(false)

    return (
        <div id="input-block">
            <label htmlFor={name}>{label}</label>
            <input type={ visible || !eye ? "text" : "password"}
                   {...rest} id={name}></input>
            {eye? 
            <div onClick={() => {setVisible(!visible)}} className="eye">
                {visible ? <FiEye color="#0D96A6" size={20} /> :
                <FiEyeOff color="#0D96A6" size={20} />}
            </div>
            : null}
        </div>
    )
}

export default Input;