import React, { useEffect, useState } from "react"
import Orphanages from "../components/Orphanages"
import WrapperContent from "../components/WrapperContent"
import api from "../services/api"

import '../styles/pages/dashboard.css'
import noPending from '../images/nopending.svg'

interface IOrphanages {
  id: number
  name: string
  latitude: number
  longitude: number
}

const ApprovedList = () => {

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
              <h2>Orfanatos Favoritos</h2>
              <p>{ orphanages.length } Orfanatos</p>
          </div>

          <div className="dashboard-orphanages">
          { orphanages.length  == 0  ? 
             <div className="no-pending">
                 <img src={noPending} alt="nenhum"/>
                 <p>Nenhum no momento</p>
             </div>
           : 
              <div className="dashboard-orphanages">
              {renderOrphanages()}
              </div>
          }
          </div>
      </div>
    </WrapperContent>
  )
}

export default ApprovedList