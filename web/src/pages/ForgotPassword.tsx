import React, { useState } from 'react'

import { FiArrowLeft } from 'react-icons/fi'
import '../styles/pages/login.css'
import { Link } from 'react-router-dom';
import WrapperContent from '../components/WrapperContent';

const ForgotPassword = () => {

    return (
        <WrapperContent id="page-content" className="page-content-left" container="form">
            <div className="homeform-form">
                
                <Link className="homeform-back" to="/login">
                   <FiArrowLeft color="#15C3D6" size={24} />
                </Link>                

                <form className="homeform-form-container">
                    <h2 className="homeform-form-title">
                        Esqueci minha senha
                    </h2>

                    <p className="homeform-description">Sua redefinição de senha será enviada para o e-mail cadastrado.</p>

                    <div className="homeform-form-input">
                        <p className="homeform-input-title">E-mail</p>
                        <input className="homeform-input" type="text"/>
                    </div>


                    <button className="homeform-button">
                        <p>Enviar email de redefinição</p>
                    </button>
                </form>
            </div>
        </WrapperContent>
    )
}

export default ForgotPassword