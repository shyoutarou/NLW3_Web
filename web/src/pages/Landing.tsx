import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import '../styles/pages/landing.css';
import logoImg from '../images/logo.svg'

function Landing() {

    const { push } = useHistory()
    
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={logoImg} alt="Happy" />
                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>
                <div className="location">
                    <strong>São Paulo</strong>
                    <span>São Paulo</span>
                </div>

                <Link to="/login" className="restrict-access" >
                    Acesso restrito
                </Link>

                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} />
                </Link>
            </div>
         </div>
    );
}

export default Landing;
