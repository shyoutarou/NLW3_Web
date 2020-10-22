import React, { FormEvent, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { toast } from 'react-toastify'
import WrapperContent from '../components/WrapperContent'
import Input from '../components/Input'
import { FiArrowLeft, FiCheck } from 'react-icons/fi'

import purpleHeartIcon from '../images/purple-heart.svg'

import '../styles/pages/login.css'

import { useAuth } from '../contexts/auth'

const Login = () => {

    const [email, setEmail] = useState<string>('ric@shik.com')
    const [password, setPassword] = useState<string>('123')
    const [rememberPassword, setRemember] = useState(false);
    const [check, setCheck] = useState(false)

    const { signIn, handleToggleRemember } = useAuth();
    const history = useHistory();
    
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
          <div className="login-container">
            <form className="login-form"
            onSubmit={(event) => handleSignIn(event)}
            >
             <div className="login-bar-container">
                <Link className="login-back" to="/landing">
                    <FiArrowLeft color="#15C3D6" size={24} />
                </Link>   
            </div>
            <fieldset>
              <legend>
                <p>Fazer login</p>
              </legend>
              <span></span>
                    <Input name="email" placeholder="E-mail"
                        type="email" value={String(email)}
                        onChange={(e) => {setEmail(e.target.value)}}
                    />
                    <Input name="password" placeholder="Senha"
                        eye="true" value={String(password)}
                        onChange={(e) => { setPassword(e.target.value)}}
                    />

                    <div className="login-options">
                        <div className="login-option-remember">
                            <div onClick={() => setCheck(!check)}
                            className={check ? "login-checkbox-active" : "login-checkbox"}>
                                <FiCheck size={18} color='white' />
                            </div>
                            <p>Lembrar-me</p>
                        </div>
                        <Link to="/forgot-password">Esqueci minha senha</Link>
                    </div>
                    <button
                        className={`login-submit ${isAble() && 'login-submit-active'}`}
                        disabled={!isAble()}
                        type="submit"
                    >
                        Entrar
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
                  </fieldset>                                    
                </form>
            </div>
        </WrapperContent>
    )
}

export default Login