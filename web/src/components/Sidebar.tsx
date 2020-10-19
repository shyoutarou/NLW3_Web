import React, { FC } from 'react'
import { FiArrowLeft, FiLogOut } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar.css';

interface SidebarProps {
  logout?: boolean
}

const Sidebar: FC<SidebarProps> = ({ children, logout }) => {

  const { push, goBack } = useHistory()

  const handleLogout = () => {
      localStorage.clear()
      push('/login')
  }

    return (
      <aside className="app-sidebar">
        <img src={mapMarkerImg} alt="Happy" />
        <footer>
          {logout ? (
                <button type="button" onClick={handleLogout}>
                    <FiLogOut size={24} color="#FFF" />
                </button>
            ) : (
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            )}
        </footer>
      </aside>
    );
}

export default Sidebar