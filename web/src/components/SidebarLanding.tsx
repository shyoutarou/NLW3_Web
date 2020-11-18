import React, { ChangeEvent, useEffect, useState } from 'react'
import logoImg from '../images/logo.svg'

import '../styles/components/sidebarlanding.css';
import SelectCity from './SelectCity';
import SelectUF from './SelectUF';
import { useLocal } from '../contexts/local'

const SidebarLanding: React.FunctionComponent = () => {

    const [selectedUf, setSelectedUf] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [selectedSigla, setselectedSigla] = useState('')

    const { Handleselectedlocal, local, clearlocal } = useLocal();

    useEffect(()  =>  {

        if(local.address)
        {
            setselectedSigla(local.address.state_code);
            setSelectedUf(local.address.state);
            setSelectedCity(local.address.city? local.address.city : "0");
        }
    
    }, [local])
        
    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        clearlocal();
        const sigla = event.target.value
        const state = event.target.selectedOptions[0].text;
        Handleselectedlocal(state, sigla, "0");
    }
 
    async function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value
        Handleselectedlocal(selectedUf, selectedSigla, city);
    }

    return (

        <div className="sidebarlanding-container">
            <div className="sidebarlanding-banner">
                <img src={logoImg} alt="Happy"/>
                <h2>Leve felicidade para o mundo</h2>
                <p>Visite orfanatos e mude o dia de muitas crianças</p>
                <div className="location">
                        <strong>
                        <SelectUF 
                                value={selectedSigla}
                                required
                                onChange={handleSelectUf} />
                        </strong>
                        <span>
                        <SelectCity 
                                value={selectedCity}
                                selectedUf={selectedSigla}
                                required
                                onChange={handleSelectCity} />
                        </span>
                </div>
            </div> 
        </div> 
    );
}

export default SidebarLanding