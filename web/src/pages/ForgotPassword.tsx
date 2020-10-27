import React, { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../services/api'
import { toast } from 'react-toastify'
import WrapperContent from '../components/WrapperContent';
import Input from '../components/Input';
import { FiArrowLeft } from 'react-icons/fi'

import '../styles/pages/forgotpassword.css'

const ForgotPassword = () => {

    const [email, setEmail] = useState<string>('ric@shik.com')

    const history = useHistory();

    const handleReset = async (e: FormEvent) => {
        e.preventDefault()
    
        try {
            await api.post('/forgotPassword', {
                email
            }).catch(error => toast.error('Ocorreu um erro ao enviar e-mail'));
    
            history.push('/forgot-password-success')
        } catch(e) {
          toast.error('Email inexistente!');
        } 
      }

      function isAble() {
        return email !== '' 
      }

    return (
        <WrapperContent id="page-content" className="page-content-left" container="form">
        <div className="forgotpassword-container">           
            <form className="forgotpassword-form"
                   onSubmit={(event) => handleReset(event)}
            >
                <div className="forgotpassword-bar-container">
                    <Link className="forgotpassword-back" to="/login">
                        <FiArrowLeft color="#15C3D6" size={24} />
                    </Link>   
                </div>
                <fieldset>
                    <legend>
                        <p>Esqueci minha senha</p>  
                    </legend>
                    <span>Sua redefinição de senha será enviada para o e-mail cadastrado.</span>
                    <Input
                        name="email"
                        placeholder="E-mail"
                        type="email"
                        value={String(email)}
                        onChange={(e) => {setEmail(e.target.value)}}
                    />
                    <button
                        className={`forgotpassword-submit ${isAble() && 'forgotpassword-submit-active'}`}
                        disabled={!isAble()}
                        type="submit"
                    >
                        Enviar email de redefinição
                    </button>
                </fieldset>                    
            </form>
        </div> 
        </WrapperContent>
    )
}

export default ForgotPassword