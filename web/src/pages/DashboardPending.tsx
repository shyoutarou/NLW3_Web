import React, { useEffect, useState } from "react"
import '../styles/pages/dashboard.css'

import noPending from '../images/nopending.svg'
import Orphanages from "../components/Orphanages"
import WrapperContent from "../components/WrapperContent"
import { useHistory, useParams } from "react-router-dom"
import api from "../services/api"

interface PendingParams {
  id: string;
}


interface IOrphanages {
  id: number
  name: string
  latitude: number
  longitude: number
}

const DashboardPending = () => {

  const { push } = useHistory()

  const params = useParams<PendingParams>();

  const [orphanages, setOrphanages] = useState<IOrphanages[]>([])

  useEffect(() => {
      api.get<IOrphanages[]>('/indexPending/0').then(res => {
          setOrphanages(res.data)
      })
  }, [])

  
  const renderOrphanages = () => {
      return orphanages.map(orphanage => {
          return (
              <Orphanages {...orphanage} />
          )
      })
  }


  return (
    <WrapperContent id="page-create-orphanage" className="page-content-left" 
      container="pending" logout>
      <div className="dashboard-main">
          <div className="dashboard-title">
              <h2>Cadastros pendentes</h2>
              <p>{ orphanages.length }  pendentes</p>
          </div>

          <div className="dashboard-orphanages">
          {params.id == "0"? 
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

export default DashboardPending