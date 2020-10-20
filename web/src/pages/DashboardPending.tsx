import React from "react"
import '../styles/pages/dashboard.css'
import { FiMapPin, FiAlertCircle } from 'react-icons/fi'

import noPending from '../images/nopending.svg'
import CreatedOrphanages from "../components/CreatedOrphanages"
import PendingOrphanages from "../components/PendingOrphanages"
import WrapperContent from "../components/WrapperContent"
import { useParams } from "react-router-dom"

interface PendingParams {
  id: string;
}
const DashboardPending = () => {

  const params = useParams<PendingParams>();

  return (
    <WrapperContent id="page-create-orphanage" className="page-content-left" 
      container="pending" logout>
      <div className="dashboard-main">
          <div className="dashboard-title">
              <h2>Cadastros pendentes</h2>
              <p>2 pendentes</p>
          </div>

          {params.id == "1"? 
          <div className="dashboard-orphanages">
             <div className="no-pending">
                 <img src={noPending} alt="nenhum"/>
                 <p>Nenhum no momento</p>
             </div>
          </div> : 
          <div className="dashboard-orphanages">
              <CreatedOrphanages pending />
          </div>
          }
      </div>
    </WrapperContent>
  )
}

export default DashboardPending