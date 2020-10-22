import React, { useEffect, useState } from "react"
import '../styles/pages/dashboard.css'
import Orphanages from "../components/Orphanages"
import WrapperContent from "../components/WrapperContent"
import api from "../services/api"

interface IOrphanages {
  id: number
  name: string
  latitude: number
  longitude: number
}

const DashboardCreated = () => {

  const [orphanages, setOrphanages] = useState<IOrphanages[]>([])

  useEffect(() => {
      api.get('/indexPending/1').then(res => {
          setOrphanages(res.data)
      })
  }, [])
  
  const renderOrphanages = () => {
    return orphanages.map(orphanage => {
        return (
            <Orphanages {...orphanage}  />
        )
    })
  }

  return (
    <WrapperContent id="page-create-orphanage" 
        className="page-content-left" 
        container="created" logout>
      <div className="dashboard-main">
          <div className="dashboard-title">
              <h2>Orfanatos cadastrados</h2>
              <p>{ orphanages.length } Orfanatos</p>
          </div>

          <div className="dashboard-orphanages">
                {renderOrphanages()}
            </div>
      </div>
    </WrapperContent>
  )
}

export default DashboardCreated