import React, { FC } from 'react'
import { FiArrowLeft, FiLogOut } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebarmap.css';

interface SidebarMapProps {
  logout?: boolean
}

const SidebarMap: FC<SidebarMapProps> = ({ children, logout }) => {

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
                <strong>São Paulo</strong>
                <span>São Paulo</span>
            </footer>
        </aside>
    );
}

export default SidebarMap