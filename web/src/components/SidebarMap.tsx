import React, { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import mapMarkerImg from '../images/map-marker.svg';
import { useLocal } from '../contexts/local'

import '../styles/components/sidebarmap.css';

const SidebarMap: React.FunctionComponent = () => {

    const [selectedUf, setSelectedUf] = useState('')
    const [selectedCity, setSelectedCity] = useState('')

    const { local } = useLocal();

    useEffect(() => {

        if(local.address)
        {
            setSelectedUf(local.address.state)
            setSelectedCity(local.address.city)
        }
    }, [local]);
      
    return (
        <div className="sidebarmap-bar-container">
            <div className="sidebarmap-banner">           
                <Link className="sidebarmap-back" to="/">
                    <FiArrowLeft color="#15C3D6" size={24} />
                </Link>   

                <img src={mapMarkerImg} alt="Happy" />                
                <h2>Escolha um orfanato no mapa</h2>
                <p>Muitas crianças estão esperando a sua visita :)</p>
                <div className="sidebarmap-location">
                    <strong>{selectedUf}</strong>
                    <span>{selectedCity}</span>
                </div>
            </div> 
        </div>
    );
}

export default SidebarMap