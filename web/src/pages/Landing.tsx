import React, { ChangeEvent, useEffect, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/landing.css';
import logoImg from '../images/logo.svg'
import SelectUF from '../components/SelectUF';
import SelectCity from '../components/SelectCity';

import axios from 'axios'
import { toast } from 'react-toastify';

interface Coordenadas {
    lat: string
    lon: string
    address: {
      city: string
      town: string
      state: string
      region: string
      country: string
      country_code: string
    }
  }

  interface IBGEUFProps {
    sigla: string;
    nome: string;
  }

  interface SelectProps {
    id: string;
    value: string;
}


function Landing() {
    
    const [selectedSigla, setselectedSigla] = useState('')
    const [selectedUf, setSelectedUf] = useState('')
    const [selectedCity, setSelectedCity] = useState('')

    useEffect(() => {

        if(navigator.geolocation) {
            if(!localStorage.getItem('@happy:latitude'))
            {
                navigator.geolocation.getCurrentPosition(showposition => {
            
                    const lat = showposition.coords.latitude.toString();
                    const lon = showposition.coords.longitude.toString();

                    const url = `https://nominatim.openstreetmap.org/reverse?addressdetails=1&lat=${lat}&lon=${lon}&format=json`

                    axios.get<Coordenadas>(url)
                   .then(response => {
           
                       const{  lat, lon, address } = response.data;
           
                       localStorage.setItem('@happy:latitude', lat);
                       localStorage.setItem('@happy:longitude', lon);
                       localStorage.setItem('@happy:estado', address.state);
                       localStorage.setItem('@happy:cidade', address.town? address.town: address.city);   

                       axios.get<IBGEUFProps[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
                       .then(response => {
                             
                       const siglas  = response.data.find(uf => uf.nome === address.state);
            
                       localStorage.setItem('@happy:sigla', String(siglas?.sigla));
                       setselectedSigla(String(siglas?.sigla))
                       setSelectedUf(String(siglas?.nome))
                       setSelectedCity(String(localStorage.getItem('@happy:cidade')))
   
                        }).catch(error => toast.error('Ocorreu um erro ao recuperar dados do IBGE'));

                    }).catch(error => toast.error('Ocorreu um erro ao determinar sua localização.'));
                  }, (error => {

                    setselectedSigla('')
                    setSelectedUf('')
                    setSelectedCity('')

                    localStorage.removeItem('@happy:latitude');
                    localStorage.removeItem('@happy:longitude');
                    localStorage.removeItem('@happy:sigla');
                    localStorage.removeItem('@happy:estado');
                    localStorage.removeItem('@happy:cidade'); 

                    toast.success('Selecione um estado e cidade para determinar sua localização.');            
                  }))
            }
            else
            {   
                    setselectedSigla(String(localStorage.getItem('@happy:sigla')))
                    setSelectedUf(String(localStorage.getItem('@happy:estado')))
                    setSelectedCity(String(localStorage.getItem('@happy:cidade')))
            }
        }  
      }, []);

        
    function isAble() {


        // console.log(localStorage.getItem('@happy:latitude'))
        // console.log(localStorage.getItem('@happy:latitude') !== null)

        return localStorage.getItem('@happy:latitude') !== 'null' && 
               localStorage.getItem('@happy:longitude') !== 'null' 
    }

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
       
        setselectedSigla(event.target.value)
        setSelectedUf(event.target.options[event.target.selectedIndex].text)
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value
        setSelectedCity(city)

        const url = `https://nominatim.openstreetmap.org/search?addressdetails=1&city=${city}&state=${selectedUf}&country=Brasil&format=json&limit=1`

         axios.get<Coordenadas[]>(url)
        .then(response => {

            const{  lat, lon, address } = response.data[0];

            localStorage.setItem('@happy:latitude', lat);
            localStorage.setItem('@happy:longitude', lon);
            localStorage.setItem('@happy:sigla', selectedSigla);
            localStorage.setItem('@happy:estado', address.state);
            localStorage.setItem('@happy:cidade', address.town);            
         }).catch(error => toast.error('Ocorreu um erro ao determinar sua localização'));
    }


    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={logoImg} alt="Happy" />
                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>
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

                {/* className={`signup-submit ${isAble() && 'signup-submit-active'}`}
                disabled={!isAble()} */}

                { isAble() &&   
                <Link to="/login" className="restrict-access" >
                    Acesso restrito
                </Link>}

                { isAble() &&   
                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} />
                </Link>
                }
            </div>
         </div>
    );
}

export default Landing;
