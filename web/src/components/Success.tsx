import React from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/components/success.css';
import successIcon from '../images/3CDC8CCreate.svg';
import deleteIcon from '../images/DF6490Delete.svg';

import { useAuth } from '../contexts/auth';

interface SuccessProps {
    title: string
    description: string
    button: string
    navigate: string
    className: string
    onClick?(): any
}

const Success: React.FC<SuccessProps> = ({ title, description, button, navigate, className, onClick}) => {

    const history = useHistory()
    const { signOut } = useAuth();

    const handleLogout = () => {

        if(title === "Não Autorizado!")
        {
            signOut();  
            history.push('/login')
        } 
        else alert("history.push(navigate)")
    }
  
    return (
        <div className={className} >
            <div className="success-aside">
                <h1 className="success-title z1">{title}</h1>
                <p className="success-description z1">{description}</p>
                <button 
                    onClick={title === "Excluir!" ? onClick : handleLogout }
                    className={className === "success-container" ? "success-button z1" : "delete-button z1"} >{button}</button>
            </div>
            <img className="z1" src={className === "success-container" ? successIcon : deleteIcon} alt="sucesso"/>
        </div>
    )
}

export default Success