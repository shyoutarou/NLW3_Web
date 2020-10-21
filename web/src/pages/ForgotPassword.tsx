import React, { useState } from 'react'

import { FiArrowLeft } from 'react-icons/fi'
import '../styles/pages/login.css'
import { Link, useHistory } from 'react-router-dom';
import WrapperContent from '../components/WrapperContent';
import Input from '../components/Input';

const ForgotPassword = () => {

    const [email, setEmail] = useState<string>('ric@shik.com')
    const { push } = useHistory()

    const handleReset = () => {
        push('/forgot-password-success')
    }
  
    return (
        <WrapperContent id="page-content" className="page-content-left" container="form">
            <div className="homeform-form">

                <div className="top-bar-container">
                    <Link className="homeform-back" to="/login">
                        <FiArrowLeft color="#15C3D6" size={24} />
                    </Link>   
                </div>
                <form className="homeform-form-container">
                    <h2 className="homeform-form-title">
                        Esqueci minha senha
                    </h2>

                    <p className="homeform-description">Sua redefinição de senha será enviada para o e-mail cadastrado.</p>

                    <Input
                        name="email"
                        placeholder="E-mail"
                        type="email"
                        value={String(email)}
                        onChange={(e) => {setEmail(e.target.value)}}
                    />


                    <button className="homeform-button"
                        onClick={handleReset}>
                        <p>Enviar email de redefinição</p>
                    </button>
                </form>
            </div>
        </WrapperContent>
    )
}

export default ForgotPassword