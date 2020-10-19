import React from "react"
import '../styles/pages/dashboard.css'
import { FiMapPin, FiAlertCircle } from 'react-icons/fi'

import noPending from '../images/nopending.svg'
import CreatedOrphanages from "../components/CreatedOrphanages"
import PendingOrphanages from "../components/PendingOrphanages"
import WrapperContent from "../components/WrapperContent"


const DashboardPending = () => {

  return (
    <WrapperContent id="page-create-orphanage" className="page-content-left" 
      container="detail" logout>
      <div className="dashboard-main">
          <div className="dashboard-title">
              <h2>Cadastros pendentes</h2>
              <p>2 pendentes</p>
          </div>

          <div className="dashboard-orphanages">
             <div className="no-pending">
                 <img src={noPending} alt="nenhum"/>
                 <p>Nenhum no momento</p>
             </div>
          </div>
      </div>
    </WrapperContent>
  )
}

export default DashboardPending