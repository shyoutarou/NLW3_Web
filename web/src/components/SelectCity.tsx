import React, { useEffect, useState, SelectHTMLAttributes } from 'react';
import Select from './Select';

import axios from 'axios'
import '../styles/components/selectuf.css';
import { toast } from 'react-toastify';

interface SelectProps {
    id: string;
    value: string;
}

interface IBGEUFProps {
    sigla: string;
    nome: string;
  }

interface SelectUFsProps extends SelectHTMLAttributes<HTMLSelectElement>  {
    selectedUf: string;
    options?: Array<{
        id: string, value: string;
    }>;
  }

const SelectCity: React.FC<SelectUFsProps> = ({ options, selectedUf, ...rest}) => 
{  
    const [cities, setCities] = useState<SelectProps[]>([])
     
    useEffect(() => {

    axios.get<IBGEUFProps[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response => {
            response.data.forEach(city => { 
                setCities(cities => ([...cities, { id: city.nome, value: city.nome } ]))
            })
        }).catch(error => toast.error('Ocorreu um erro ao recuperar dados do IBGE'));

    }, [selectedUf])

    return (
            <Select name="cidade" {...rest} tipo="uma cidade"
            options={options? options  : cities.sort((a, b) => a.id > b.id ? 1 : -1)}   />
    )
}

export default SelectCity