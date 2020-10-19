import React from "react"
import Sidebar from "../components/Sidebar"
import '../styles/pages/dashboard.css'
import { FiMapPin, FiAlertCircle } from 'react-icons/fi'
import CreatedOrphanages from "../components/CreatedOrphanages"


const DashboardCreated = () => {

  return (
    <div id="page-create-orphanage">
      <Sidebar logout>
          <div className="dashboard-marker-icon">
              <FiMapPin color="#0089A5" size={24} />
          </div>
          <div className="dashboard-warning-icon">
              <div className="yellow-circle">
                  <div className="point"></div>
              </div>
              <FiAlertCircle color="white" size={24} />
          </div>
      </Sidebar>

      <div className="dashboard-main">
          <div className="dashboard-title">
              <h2>Orfanatos cadastrados</h2>
              <p>2 Orfanatos</p>
          </div>

          <div className="dashboard-orphanages">
              <CreatedOrphanages />
              <CreatedOrphanages />
              <CreatedOrphanages />
              <CreatedOrphanages />
          </div>
      </div>
    </div>
  )
}

export default DashboardCreated