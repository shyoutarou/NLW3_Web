import React from 'react'
import Success from '../components/Success'

const ResetPasswordSuccess = () => {
    return (
        <Success navigate="/"  className="success-container"
        button="Voltar ao login" 
        description="Sua nova senha já pode ser usada!" 
        title="Reset de senha concluído!" />
    )
}

export default ResetPasswordSuccess