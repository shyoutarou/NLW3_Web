import React, { FC } from 'react'
import { FiArrowLeft, FiPower, FiMapPin, FiAlertCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

import mapMarkerImg from '../images/map-marker.svg';
import '../styles/components/sidebar.css';

interface SidebarProps {
  logout?: boolean
  pending?: boolean
}

const Sidebar: FC<SidebarProps> = ({ children, logout, pending }) => {

  const { push, goBack } = useHistory()
  const { signOut } = useAuth();
  
  const handleLogout = () => {
      localStorage.clear()
      signOut();  
      push('/login')
  }

  const handleCreated = () => {
      push('/approvedlist/1')
  }

  const handlePending = () => {
      push('/pendinglist')
  }
    
    return (
      <aside className="app-sidebar">
        <img src={mapMarkerImg} alt="Happy" />
        {logout && 
          <div>
            <button type="button" 
                className={`optins-button${!pending ? '-active' : ''}`}
                onClick={handleCreated}>
                <FiMapPin size={24} color="#FFF" />
            </button>
            
            <button type="button" 
                className={`optins-button${pending ? '-active' : ''}`}
                onClick={() => handlePending()}>
                <div className="sidebar-yellow-icon">
                <div className="yellow-circle">
                    <div className="point"></div>
                </div>
                <FiAlertCircle color="#FFF" size={24} />
                </div>
            </button>

          </div>
        }
        <footer>
          {logout ? (
                <button type="button" onClick={handleLogout}>
                    <FiPower size={24} color="#FFF" />
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