import React from 'react'
import { FC } from 'react'
import { FiEdit3, FiTrash } from 'react-icons/fi'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { useHistory } from 'react-router-dom'
import '../styles/components/created-orphanage.css'
import mapIcon from '../utils/mapIcon'

interface CreatedProps {
  permission?: boolean
  id: number
  name: string
  latitude: number
  longitude: number
}

const Orphanages: FC<CreatedProps> = ({ permission, id, latitude, longitude, name }) => {

  const { push } = useHistory()

  const handleEdit = () => {
    console.log(permission)
    permission? push(`/orphanages/verify/${id}`) : push(`/orphanages/edit/${id}`)
  }

  const handleDelete = () => {
      push('/delete-success')
  }
  
  return (
      <div className="created-orphanage-container">
          <Map  center={[latitude, longitude]} 
            style={{ width: '100%', height: 227, borderRadius: 16 }}
            zoom={15} >
          <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
          <Marker interactive={false} icon={mapIcon} position={[latitude, longitude]} />
          </Map>
          <div className="created-orphanage-options">
            <div className="created-orphanage-name">
              <h2>{name}</h2>
            </div>
            <div className="created-orphanage-buttons">
              <button type="button" className="created-orphanage-button"
                      onClick={handleEdit}>
                 <FiEdit3 size={20} color="#4D6F80" />
              </button>
              {permission &&
              <button type="button" className="created-orphanage-button"
                      onClick={handleDelete}>
                <FiTrash size={20} color="#4D6F80" />
              </button>  }
            </div>
          </div>
      </div>
  )
}

export default Orphanages













