import React from 'react'

import logoImg from '../images/logo.svg';
import squaredBgImg from '../images/squared-background.svg';

import '../styles/components/logocontainer.css';

const logoContainerStyle = {
  backgroundImage: `url(${squaredBgImg})`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  zIndex: 0,
}

const LogoContainer: React.FunctionComponent<{ background?: boolean }> = ({
  background = true,
}) => {
  return (

    <div className="logocontain-container">
      <div className="logocontain-banner">
          <img width={110} src={logoImg} alt="logo"/>
          <h2 className="logocontain-logo">happy</h2>
          <h2 className="logocontain-city">Fortaleza</h2>
          <h2 className="logocontain-state">Ceará</h2>
      </div> 
    </div> 
  )
}

export default LogoContainer