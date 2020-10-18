import React, { useState } from 'react'
import { FiArrowLeft, FiCheck, FiEye, FiEyeOff } from 'react-icons/fi'

import '../styles/pages/login.css'
import logoImg from '../images/map-marker.svg';

const ResetPassword = () => {

    const [eyePassword, setEyePassword] = useState(false)
    const [eyeConfirmPassword, setEyeConfirmPassword] = useState(false)

    const handleEyePassword = () => {
        setEyePassword(!eyePassword)
    }

    const handleEyeConfirmPassword = () => {
        setEyeConfirmPassword(!eyeConfirmPassword)
    }

    return (
        <div className="homeform-container">
            <div className="homeform-banner">
                <img width={110} src={logoImg} alt="logo"/>
                <h2 className="homeform-logo">happy</h2>
                <h2 className="homeform-city">Fortaleza</h2>
                <h2 className="homeform-state">Ceará</h2>
            </div>
            <div className="homeform-form">
                
                    <div className="homeform-back">
                        <FiArrowLeft color="#15C3D6" size={24} />
                    </div>
                

                <form className="homeform-form-container">
                    <h2 className="homeform-form-title">
                        Redefinição de senha
                    </h2>

                    <p className="homeform-description">Escolha uma nova senha para você acessar o dashboard do Happy.</p>

                    <div className="homeform-form-input">
                        <p className="homeform-input-title">Nova senha</p>
                        <input className="homeform-input" type={eyePassword ? "text" : "password"}/>
                        {eyePassword ? (
                            <FiEye onClick={handleEyePassword}
                            className="homeform-eye" size={20} color="#15C3D6"/>
                        ) : (
                            <FiEyeOff onClick={handleEyePassword}
                            className="homeform-eye" size={20} color="#15C3D6"/>
                        )}
                    </div>

                    <div className="homeform-form-input">
                        <p className="homeform-input-title">Repetir senha</p>
                        <input className="homeform-input" type={eyeConfirmPassword ? "text" : "password"}/>
                        {eyeConfirmPassword ? (
                            <FiEye onClick={handleEyeConfirmPassword}
                            className="homeform-eye" size={20} color="#15C3D6"/>
                        ) : (
                            <FiEyeOff onClick={handleEyeConfirmPassword}
                            className="homeform-eye" size={20} color="#15C3D6"/>
                        )}
                    </div>


                    <button className="homeform-button">
                        <p>Redefinir senha</p>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword