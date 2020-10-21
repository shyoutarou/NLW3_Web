import React, { FormEvent, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import api from '../services/api'
import { toast } from 'react-toastify'
import WrapperContent from '../components/WrapperContent';
import Input from '../components/Input';
import { FiArrowLeft } from 'react-icons/fi'

import '../styles/pages/resetpassword.css'

function ResetPassword() {

    const [password, setPassword] = useState<string>('123')
    const [confirmPassword, setConfirmPassword] = useState<string>('123')
  
    const history = useHistory();
    // const { id, token } = useParams();

    function handleResetSucess(e: FormEvent) {
        e.preventDefault();
    
        try {
            if (isAble() && password === confirmPassword) {
        
                history.push('/reset-password-success')
                
                // api.post(`resetPassword/${id}`, {
                //   password,
                //   token,
                // }).then(() => {
                    
                //       history.push('/reset-password-success')
                // }).catch((error) =>{
                //     toast.error('Ocorreu um erro ao fazer a alteração');
                // })
            } else {
            toast.error("Suas senhas não batem.")
            }
        } catch (err) {
            toast.error('Ocorreu um erro ao recuperar senha');
        }              
    }
  
    function isAble() {
        return password !== '' && confirmPassword !== '' 
    }

    return (
        <WrapperContent id="page-content" className="page-content-left" container="form">
         <div className="resetpassword-container">
            <form className="resetpassword-form"
                 onSubmit={(event) => handleResetSucess(event)}
            >
                <div className="top-bar-container">
                    <Link className="resetpassword-back" to="/login">
                        <FiArrowLeft color="#15C3D6" size={24} />
                    </Link>   
                </div>
                <fieldset>
                    <legend>
                        <p>Redefinição de senha</p>
                    </legend>
                    <span>Escolha uma nova senha para você acessar o dashboard do Happy.</span>
                    <Input
                        name="password"
                        placeholder="Nova senha"
                        eye="true"
                        value={String(password)}
                        onChange={(e) => { setPassword(e.target.value)}}
                    />
                    <Input
                        name="password"
                        placeholder="Repetir senha"
                        eye="true"
                        value={String(confirmPassword)}
                        onChange={(e) => { setConfirmPassword(e.target.value)}}
                    />
                    <button
                        className={`resetpassword-submit ${isAble() && 'resetpassword-submit-active'}`}
                        disabled={!isAble()}
                        type="submit"
                    >
                        Redefinir senha
                    </button>
                </fieldset>                    
            </form>
        </div>
      </WrapperContent>            
    )
}

export default ResetPassword