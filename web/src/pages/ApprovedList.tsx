import React, { useEffect, useState } from "react"
import Orphanages from "../components/Orphanages"
import WrapperContent from "../components/WrapperContent"
import api from "../services/api"

import '../styles/pages/dashboard.css'
import noPending from '../images/nopending.svg'
import { toast } from "react-toastify"
import { useHistory } from "react-router-dom"

interface IOrphanages {
  id: number
  name: string
  latitude: number
  longitude: number
}

const ApprovedList = () => {

  const history = useHistory()
  const [orphanages, setOrphanages] = useState<IOrphanages[]>([])

  useEffect( ()  =>  {
    try {
            let token = localStorage.getItem('@happy:token');
            if (!token) { token = sessionStorage.getItem('@happy:token');}
            if (!token) history.push('/loginerror')

            api.defaults.headers.authorization = `Bearer ${token}`

            handleLoadList();

      } catch(e) {
        toast.error('Ocorreu um erro ao recuperar os orfanatos');
      } 
  }, [history])


  const handleLoadList = async () => {
    try {
       
        return await api.get<IOrphanages[]>('/indexPending/1').then(res => {
          setOrphanages(res.data)
          }).catch((err) => {
              if (err.response.status === 401) {
                  toast.error('Você não tem permissão para acessar essa página.')
                  history.push('/loginerror')
              } else if (err.response.status === 404) {
                  toast.error('O conteúdo desta página não foi encontrado.')
                  history.push('/')
              }else  {
                  toast.error('Ocorreu um erro ao recuperar os orfanatos.')
              }
          });
      } catch {
          alert('Ocorreu um erro ao recuperar os orfanatos.')
      }
  }
  
  const renderOrphanages = () => {
    return orphanages.map(orphanage => {
        return (
            <Orphanages key={orphanage.id}  {...orphanage}  />
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
          { orphanages.length === 0  ? 
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