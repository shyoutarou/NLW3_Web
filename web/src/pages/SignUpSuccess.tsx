import React from 'react'
import Success from '../components/Success'

const SignUpSuccess = () => {
    return (
        <Success navigate="/login" className="success-container"
        button="Ir para o login" 
        description="Agora você faz parte da plataforma Happy. Tenha uma ótima experiência" 
        title="Cadastro realizado!"  />
    )
}

export default SignUpSuccess