import React from 'react'
import Success from '../components/Success'

const NotFound = () => {
   
    return (
        <Success navigate="/login" className="delete-container"
        button="Login" 
        description="Você precisa estar logado :(" 
        title="Não Autorizado!" 
        onClick={()=>alert("HOlllaa NotFound")} />
    )
}

export default NotFound