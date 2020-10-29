import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Success from '../components/Success'
import api from '../services/api'


interface OrphanageParams {
    id: string;
    tela: string;
  }

const DeleteSuccess = () => {

    const { push } = useHistory()
    const params = useParams<OrphanageParams>();
  
    const handleDelete = async () => {
        try {

            console.log("handleDelete")
            await api.delete(`/orphanages/delete/${params.id}`)
    
            push('/app')
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