import React from 'react'
import Success from '../components/Success'

const SignUpSuccess = () => {
    return (
        <Success navigate="/app" className="success-container"
        button="Voltar para o mapa" 
        description="Agora você faz parte da plataforma Happy. Tenha uma ótima experiência" 
        title="Cadastro realizado!"  />
    )
}

export default SignUpSuccess