import React, { useState } from 'react'
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi'

import '../styles/pages/login.css'
import WrapperContent from '../components/WrapperContent';
import { Link, useHistory } from 'react-router-dom';
import Input from '../components/Input';

const ResetPassword = () => {

    const [password, setPassword] = useState<string>('123')
    const [newpassword, setNewpassword] = useState<string>('123')

    const { push } = useHistory()
    const [eyePassword, setEyePassword] = useState(false)
    const [eyeConfirmPassword, setEyeConfirmPassword] = useState(false)

    const handleEyePassword = () => {
        setEyePassword(!eyePassword)
    }

    const handleEyeConfirmPassword = () => {
        setEyeConfirmPassword(!eyeConfirmPassword)
    }

    const handleResetSucess = () => {
        push('/reset-password-success')
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
                        Redefinição de senha
                    </h2>

                    <p className="homeform-description">Escolha uma nova senha para você acessar o dashboard do Happy.</p>


                    <div className="homeform-form-input">
                        <Input
                            name="password"
                            placeholder="Nova senha"
                            eye="true"
                            value={String(password)}
                            onChange={(e) => { setPassword(e.target.value)}}
                        />
                    </div>

                    <div className="homeform-form-input">
                        <Input
                            name="password"
                            placeholder="Repetir senha"
                            eye="true"
                            value={String(newpassword)}
                            onChange={(e) => { setNewpassword(e.target.value)}}
                        />
                    </div>


                    <button className="homeform-button"
                        onClick={handleResetSucess}>
                        <p>Redefinir senha</p>
                    </button>
                </form>
            </div>
        </WrapperContent>
    )
}

export default ResetPassword