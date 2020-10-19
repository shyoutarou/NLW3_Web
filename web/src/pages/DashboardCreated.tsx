import React from "react"
import '../styles/pages/dashboard.css'
import CreatedOrphanages from "../components/CreatedOrphanages"
import WrapperContent from "../components/WrapperContent"


const DashboardCreated = () => {

  return (
    <WrapperContent id="page-create-orphanage" 
        className="page-content-left" 
        container="detail" logout>
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
    </WrapperContent>
  )
}

export default DashboardCreated