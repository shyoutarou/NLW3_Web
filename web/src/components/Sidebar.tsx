import React, { useEffect, useState } from 'react'
import { FiArrowLeft, FiPower, FiMapPin, FiAlertCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import { useLocal } from '../contexts/local'

import mapMarkerImg from '../images/map-marker.svg';
import '../styles/components/sidebar.css';

interface SidebarProps {
  logout?: boolean
  container?: string
}

const Sidebar: React.FunctionComponent<SidebarProps> = ({ logout, container }) => {

  const [selectedUf, setSelectedUf] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  
  const { push, goBack } = useHistory()
  const { signOut } = useAuth();
  const { local } = useLocal();
  
  const handleLogout = () => {
      signOut();  
      push('/login')
  }

  const handleCreated = () => {
      push('/approvedlist')
  }

  const handlePending = () => {
      push('/pendinglist')
  }

  useEffect(() => {

    if(local.address)
    {
        setSelectedUf(local.address.state)
        setSelectedCity(local.address.city)
    }
  }, [local]);

    return (

      <div className="sidebar-bar-container">
          <div className="sidebar-banner">  
            <div  >
                {logout ? (
                        <button type="button" className="sidebar-back" onClick={handleLogout}>
                            <FiPower size={24} color="#FFF" />
                        </button>
                    ) : (
                        <button type="button" className="sidebar-back" onClick={goBack}>
                            <FiArrowLeft size={24} color="#FFF" />
                        </button>
                    )}
            </div>
            <img src={mapMarkerImg} alt="Happy" />      
            <div className="sidebar-location">

            
                {container === 'detail' || 
                 container === 'created' || 
                 container === 'pending'?           
                    <h1>Happy</h1> :
                    <h2>Preencha os dados do orfanato</h2>
                }                
                <strong>{selectedUf}</strong>
                <span>{selectedCity}</span>
            </div>
            {logout && 
                <div className="sidebar-options">
                    <button type="button" 
                        className={`optins-button${container !== 'pending'? '-active' : ''}`}
                        onClick={handleCreated}>
                        <FiMapPin size={24} color="#FFF" />
                    </button>
                    
                    <button type="button" 
                        className={`optins-button${container === 'pending'? '-active' : ''}`}
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
          </div> 
      </div>
    );
}

export default Sidebar