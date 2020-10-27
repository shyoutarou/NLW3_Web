import React, { useEffect, useState } from "react"
import '../styles/pages/dashboard.css'

import noPending from '../images/nopending.svg'
import Orphanages from "../components/Orphanages"
import WrapperContent from "../components/WrapperContent"
import { useParams } from "react-router-dom"
import api from "../services/api"
import { toast } from "react-toastify"

interface PendingParams {
  id: string;
}


interface IOrphanages {
  id: number
  name: string
  latitude: number
  longitude: number
}

const PendingList = () => {

  const params = useParams<PendingParams>();

  const [orphanages, setOrphanages] = useState<IOrphanages[]>([])

  useEffect(() => {

      try {
           api.get<IOrphanages[]>('/indexPending/0').then(res => {
            setOrphanages(res.data)
        }).catch(error => toast.error('Ocorreu um erro ao recuperar o orfanato'));
      } catch(e) {
        toast.error('Email inexistente!');
      } 
      
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
              <h2>Orfanatos Disponíveis</h2>
              <p>{ orphanages.length }  pendentes</p>
          </div>

          <div className="dashboard-orphanages">
          { orphanages.length  === 0  ? 
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

export default PendingList