import React from 'react'

import logoImg from '../images/map-marker.svg';
import squaredBgImg from '../images/squared-background.svg';

import '../styles/components/sidebarform.css';

const logoContainerStyle = {
  backgroundImage: `url(${squaredBgImg})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  zIndex: 0,
}

const SidebarForm: React.FunctionComponent<{ background?: boolean }> = ({
  background = true,
}) => {
  return (

    <div className="sidebarform-container">
      <div className="sidebarform-banner">
          <img width={110} src={logoImg} alt="logo"/>
          <h2 className="sidebarform-logo">happy</h2>
          <h2 className="sidebarform-city">Fortaleza</h2>
          <h2 className="sidebarform-state">Ceará</h2>
      </div> 
    </div> 
  )
}

export default SidebarForm