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
    options?: Array<{
        id: string, value: string;
    }>;
  }

const SelectUF: React.FC<SelectUFsProps> = ({ options, ...rest}) => 
{  
    const [ufs, setUfs] = useState<SelectProps[]>([])

    useEffect(() => {

    //   axios.get<IBGEUFProps[]>('https://nominatim.openstreetmap.org/search?addressdetails=1&city=Campinas&state=S%C3%A3o%20Paulo&country=Brasil&format=json&limit=1')
    //   .then(response => {

    //     console.log(response.data)
    //     // response.data.map(uf => { 
    //     //     setUfs(ufs => ([...ufs, { id: uf.sigla, value: uf.nome + "(" + uf.sigla + ")" } ]))
    //     // } )
    // })
    

      
        axios.get<IBGEUFProps[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
          .then(response => {
            response.data.map(uf => { 
                setUfs(ufs => ([...ufs, { id: uf.sigla, value: uf.nome} ]))
            } )
        }).catch(error => toast.error('Ocorreu um erro ao recuperar dados do IBGE'));
      }, [])
           
    return (
            <Select name="estado" {...rest} tipo="um estado"
            options={options? options  : ufs.sort((a, b) => a.id > b.id ? 1 : -1)}   />
    )
}

export default SelectUF