import React from 'react'
import Success from '../components/Success'

const CreateOrphanageSuccess = () => {
    return (
        <Success navigate="/app" className="success-container"
        button="Voltar para o mapa" 
        description="O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar:)" 
        title="Ebaaa!"  />
    )
}

export default CreateOrphanageSuccess