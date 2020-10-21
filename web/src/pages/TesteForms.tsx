import React, { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Input from '../components/Input'
import WrapperContent from '../components/WrapperContent'

import '../styles/pages/testfoms.css'

export default function TesteForms() {
return (
      <WrapperContent id="page-content" className="page-content-left" container="form">

        
        <div className="testform-container">
            <div className="top-bar-container">
                <Link className="homeform-back" to="/login">
                    <FiArrowLeft color="#15C3D6" size={24} />
                </Link>   
            </div>
            <form className="form-80">
            <fieldset>
            <legend>
                <p>Cadastro</p>
            </legend>
            <span>Preencha os dados abaixo para começar.</span>
            <Input
                name="name"
                placeholder="Nome"
                type="text"
            />
            <Input
                name="email"
                placeholder="E-mail"
                type="email"
            />
            <Input
                name="password"
                placeholder="Senha"
                eye="true"
            />
            <button
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