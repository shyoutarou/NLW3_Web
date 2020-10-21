import React from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/components/success.css';
import successIcon from '../images/3CDC8CCreate.svg';
import deleteIcon from '../images/DF6490Delete.svg';

interface SuccessProps {
    title: string
    description: string
    button: string
    navigate: string
    className: string
}

const Success: React.FC<SuccessProps> = ({ title, description, button, navigate, className}) => {

    const history = useHistory()

    return (
        <div className={className} >
            <div className="success-aside">
                <h1 className="success-title z1">{title}</h1>
                <p className="success-description z1">{description}</p>
                <button onClick={() => history.push(navigate)} 
                  className={className=="success-container" ? "success-button z1" : "delete-button z1"} >{button}</button>
            </div>
            <img className="z1" src={className=="success-container" ? successIcon : deleteIcon} alt="sucesso"/>
        </div>
    )
}

export default Success