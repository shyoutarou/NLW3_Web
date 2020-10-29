import React from 'react'
import Success from '../components/Success'
import { useAuth } from '../contexts/auth';

const NotFound = () => {

    const { signOut } = useAuth();
    
    return (
        <Success navigate="/login" className="delete-container"
        button="Login" 
        description="Você precisa estar logado :(" 
        title="Não Autorizado!" 
        onClick={()=>alert("HOlllaa NotFound")} />
    )
}

export default NotFound