import React from 'react'
import Success from '../components/Success'

const DeleteSuccess = () => {
    return (
        <Success navigate="/app" className="delete-container"
        button="Voltar para o mapa" 
        description="Você tem certeza que quer excluir?" 
        title="Excluir!"  />
    )
}

export default DeleteSuccess