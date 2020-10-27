import React, { FC, useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebarmap.css';

interface SidebarMapProps {
  logout?: boolean
}

const SidebarMap: FC<SidebarMapProps> = ({ children, logout }) => {

    const [selectedUf, setSelectedUf] = useState('')
    const [selectedCity, setSelectedCity] = useState('')

    useEffect(() => {

      if(localStorage.getItem('@happy:latitude'))
      {
          setSelectedUf(String(localStorage.getItem('@happy:estado')))
          setSelectedCity(String(localStorage.getItem('@happy:cidade')))
      }
    }, []);
      
    return (
        <aside>
            <header>
                <div className="sidebarmap-bar-container">
                    <Link className="sidebarmap-back" to="/landing">
                        <FiArrowLeft color="#15C3D6" size={24} />
                    </Link>   
                </div>
                <img src={mapMarkerImg} alt="Happy" />                
                <h2>Escolha um orfanato no mapa</h2>
                <p>Muitas crianças estão esperando a sua visita :)</p>
            </header>
            <footer>
                <strong>{selectedUf}</strong>
                <span>{selectedCity}</span>
            </footer>
        </aside>
    );
}

export default SidebarMap