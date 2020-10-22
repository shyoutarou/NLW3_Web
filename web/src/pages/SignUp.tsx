import React, { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import WrapperContent from '../components/WrapperContent';
import Input from '../components/Input';
import { FiArrowLeft } from 'react-icons/fi';

import '../styles/pages/signup.css';

import api from '../services/api'

function SignUp() {

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const history = useHistory();
  
  function isAble() {
    return name !== '' && email !== '' && password !== ''
  }

  async function handleCreateUser(e: FormEvent) {
    e.preventDefault()
    if (isAble()) {
      try {
        await api.post('users', { name, email, password })
          history.push('/signup-success')
      } catch(e) {
        toast.error('Ocorreu um erro ao fazer o cadastro');
      }
    }
  }

  return (
      <WrapperContent id="page-content" className="page-content-left" container="form">
        <div className="signup-container">
          <form className="signup-form" onSubmit={(event) => handleCreateUser(event)}
          >
             <div className="signup-bar-container">
                <Link className="signup-back" to="/login">
                    <FiArrowLeft color="#15C3D6" size={24} />
                </Link>   
            </div>
            <fieldset>
              <legend>
                <p>Cadastro</p>
              </legend>
              <span>Preencha os dados abaixo para começar.</span>
              <Input
                name="name"
                placeholder="Nome"
                type="text"

                value={String(name)}
                onChange={(e) => {setName(e.target.value)}}
              />
              <Input
                name="email"
                placeholder="E-mail"
                type="email"
                value={String(email)}
                onChange={(e) => {setEmail(e.target.value)}}
              />
              <Input
                name="password"
                placeholder="Senha"
                eye="true"
                value={String(password)}
                onChange={(e) => { setPassword(e.target.value)}}
              />
              <button
                className={`signup-submit ${isAble() && 'signup-submit-active'}`}
                disabled={!isAble()}
                type="submit"
              >
                Concluir cadastro
              </button>
            </fieldset>
          </form>
        </div>
      </WrapperContent>
  )
}

export default SignUp
