import React from 'react'

import logoImg from '../images/map-marker.svg';
import '../styles/components/sidebarform.css';

const SidebarForm: React.FunctionComponent = () => {
  return (

    <div className="sidebarform-container">
      <div className="sidebarform-banner">
          <img src={logoImg} alt="logo"/>
          <h2 className="sidebarform-logo">Happy</h2>
          <h2 className="sidebarform-city">São Paulo</h2>
          <h2 className="sidebarform-state">São Paulo</h2>
      </div> 
    </div> 
  )
}

export default SidebarForm