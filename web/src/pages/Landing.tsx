import React, { useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/landing.css';

import WrapperContent from '../components/WrapperContent';

import { useLocal } from '../contexts/local'

function Landing() {
    
    const { setcurrentlocal, isable } = useLocal();

    useEffect(() => {

        async function Handlecurrentlocal() {
            return await setcurrentlocal();
        }
        
        Handlecurrentlocal();
      }, []);



    return (
        <WrapperContent id="page-content" className="page-content-right" container="landing">
          <div className="page-landing">
            <div className="content-wrapper">

                <Link to="/login" 
                      className={`restrict-access ${isable && 'restrict-access-active'}`} >
                      Acesso restrito
                </Link>

                <Link to="/app" 
                className={`enter-app ${isable && 'enter-app-active'}`} >
                    <FiArrowRight size={26} />
                </Link>
            </div>
            </div>
        </WrapperContent>
    );
}

export default Landing;
