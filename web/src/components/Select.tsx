import React, {SelectHTMLAttributes} from 'react';
import '../styles/components/select.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>  {
    name: string;
    label?: string;
    tipo?: string;
    options: Array<{
        id: string, value: string
    }>;
  }

const Select: React.FC<SelectProps> = ({label, name, tipo, options, ...rest}) => 
{  
    return (
        <div className="select-block">
            {label && <label htmlFor={name}>{label}</label> }
            <select id={name} {...rest} > 
                <option value="" disabled hidden >
                Selecione {tipo? tipo : "uma opção" }
                </option>
                {options.map(option => {
                    return <option key={option.id} value={option.id} >{option.value}</option>
                })}
            </select>
        </div>
    )
}

export default Select;