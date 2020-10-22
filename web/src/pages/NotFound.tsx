import React from 'react'
import Success from '../components/Success'

const NotFound = () => {
    return (
        <Success navigate="/" className="delete-container"
        button="Voltar ao início" 
        description="Página não encontrada :(" 
        title="Erro!"  />
    )
}

export default NotFound