import React, { useEffect, useState } from "react"
import '../styles/pages/dashboard.css'

import noPending from '../images/nopending.svg'
import Orphanages from "../components/Orphanages"
import WrapperContent from "../components/WrapperContent"
import api from "../services/api"
import { toast } from "react-toastify"
import { useAuth } from "../contexts/auth"
import { useHistory } from "react-router-dom"

interface IOrphanages {
  id: number
  name: string
  latitude: number
  longitude: number
}

const PendingList = () => {

  const history = useHistory();

  const [orphanages, setOrphanages] = useState<IOrphanages[]>([])

  
  useEffect(() => {

      let token = localStorage.getItem('@happy:token');
      if (!token) {
        token = sessionStorage.getItem('@happy:token');
      }

      if (!token) history.push('/loginerror')

      api.defaults.headers.authorization = `Bearer ${token}`

      try {
           api.get<IOrphanages[]>('/indexPending/0').then(res => {
            setOrphanages(res.data)
        }).catch((err) => {

            if (err.response.status === 401) {
                toast.error('Você não tem permissão para acessar essa página.')
                history.push('/loginerror')
            } else if (err.response.status === 404) {
                toast.error('O conteúdo desta página não foi encontrado.')
                history.push('/')
            }else  {
                toast.error('Ocorreu um erro ao recuperar o orfanato.')
            }
        });

      } catch(e) {
        toast.error('Ocorreu um erro ao recuperar o orfanato.');
      } 
      
  }, [])
 
  const renderOrphanages = () => {
      return orphanages.map(orphanage => {
          return (
              <Orphanages key={orphanage.id} {...orphanage} />
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