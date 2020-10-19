import React, { useEffect, useState } from 'react'

import { FiArrowLeft, FiCheck } from 'react-icons/fi'

import { FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/auth'
import { toast } from 'react-toastify'

import '../styles/pages/login.css'
import purpleHeartIcon from '../images/purple-heart.svg'
import WrapperContent from '../components/WrapperContent'

const Login = () => {

    const [email, setEmail] = useState<string>('ric@shik.com')
    const [password, setPassword] = useState<string>('123')
    const [rememberPassword, setRemember] = useState(false);
  
    const { signIn, handleToggleRemember } = useAuth();
    const history = useHistory();
    
    const [check, setCheck] = useState(false)

    useEffect(() => {
        try {
          const localtoken = localStorage.getItem('@happy:token');
          const localuser = localStorage.getItem('@happy:user');
    
          if (localtoken) {
              sessionStorage.setItem('@happy:token', localtoken);
              sessionStorage.setItem('@happy:user', JSON.stringify(localuser));
    
              handleToggleRemember(localtoken,  JSON.parse(localuser as string));
    
              history.push('/');
          }
        }
        catch (err) {
            return
        }
      }, [handleToggleRemember, history])
      
    async function handleSignIn(e: FormEvent) {
        e.preventDefault()
    
        console.log("token", "user");

        try {
            if (isAble()) {
              await signIn( email, password, rememberPassword);
            }
          } catch (err) {
              toast.error('Ocorreu um erro ao fazer login, cheque as credenciais');
          }
      }
    
      function isAble() {
        return email !== '' && password !== ''
      }

    return (
        <WrapperContent id="page-content" className="page-content-right" container="form">
            <div className="homeform-form">
                <Link className="homeform-back" to="/">
                   <FiArrowLeft color="#15C3D6" size={24} />
                </Link>                   

                <form className="homeform-form-container" onSubmit={(e) => handleSignIn(e)} >
                    <h2 className="homeform-form-title">
                        Fazer login
                    </h2>

                    <div className="homeform-form-input">
                        <p className="homeform-input-title">E-mail</p>
                        <input className="homeform-input" 
                               type="email"
                               value={String(email)}
                               onChange={(e) => {setEmail(e.target.value) }}
                        />
                    </div>

                    <div className="homeform-form-input">
                        <p className="homeform-input-title">Senha</p>
                        <input className="homeform-input" 
                               type="text"
                               value={String(password)}
                               onChange={(e) => { setPassword(e.target.value)}}
                        />
                    </div>

                    <div className="homeform-options">
                        <div className="homeform-option-remember">
                            <div onClick={() => setCheck(!check)}
                            className={check ? "homeform-checkbox-active" : "homeform-checkbox"}>
                                <FiCheck size={18} color='white' />
                            </div>
                            <p>Lembrar-me</p>
                        </div>
                        <Link to="/forgot-password">Esqueci minha senha</Link>
                    </div>

                    <button className="homeform-button">
                        <p>Entrar</p>
                    </button>
                    <div className="login-footer">
                    <div className="signup">
                        <p>Não tem conta?</p>
                        <Link to="/signup">Cadastre-se</Link>
                    </div>
                    <span>
                        É de graça <img src={purpleHeartIcon} alt="Coração roxo" />
                    </span>
                    </div>                    
                </form>
            </div>
        </WrapperContent>
    )
}

export default Login