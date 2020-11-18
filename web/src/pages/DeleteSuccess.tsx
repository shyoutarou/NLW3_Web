import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Success from '../components/Success'
import api from '../services/api'


interface OrphanageParams {
    id: string;
    tela: string;
  }

const DeleteSuccess = () => {

    const history = useHistory()
    const params = useParams<OrphanageParams>();
    
    const handleDelete = async () => {
        try {

            let token = localStorage.getItem('@happy:token');
            if (!token) {
              token = sessionStorage.getItem('@happy:token');
            }

            if (!token) history.push('/loginerror')
            
            api.defaults.headers.authorization = `Bearer ${token}`
            await api.delete(`/orphanages/delete/${params.id}`).catch((err) => {

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
    
            history.push('/app')
        } catch {
            alert('Erro ao deletar')
        }
    }
    
    return (
        
        <Success navigate="/app" className="delete-container"
        button="Confirmar exclusão" 
        description="Você tem certeza que quer excluir?" 
        title="Excluir!" 
        onClick={handleDelete} 
         />
    )
}

export default DeleteSuccess