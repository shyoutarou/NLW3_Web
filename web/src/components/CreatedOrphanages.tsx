import React from 'react'
import { FC } from 'react'
import { FiEdit3, FiTrash } from 'react-icons/fi'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { useHistory } from 'react-router-dom'
import '../styles/components/created-orphanage.css'
import mapIcon from '../utils/mapIcon'

interface CreatedProps {
  pending?: boolean
}

const CreatedOrphanages: FC<CreatedProps> = ({ pending }) => {

  const { push } = useHistory()
  
  const handleEdit = () => {
    pending? push('/orphanages/verify/1') : push('/orphanages/edit/1')
  }

  const handleDelete = () => {
      push('/delete-success')
  }
  
  return (
      <div className="created-orphanage-container">
          <Map
            center={[-27.2092052,-49.6401092]} 
            style={{
                width: '100%',
                height: 227,
                borderRadius: 16
            }}
            zoom={15}
            
          >
          <TileLayer
            url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />

            
          <Marker interactive={false} icon={mapIcon} position={[-27.2092052,-49.6401092]} />
            
          </Map>
          <div className="created-orphanage-options">
            <div className="created-orphanage-name">
              <h2>Lar das meninas</h2>
            </div>
            <div className="created-orphanage-buttons">
              <button type="button" className="created-orphanage-button"
                  onClick={handleEdit}>
                  <FiEdit3 size={20} color="#4D6F80" />
              </button>
              <button type="button" className="created-orphanage-button"
                  onClick={handleDelete}>
                  <FiTrash size={20} color="#4D6F80" />
              </button>              
            </div>
          </div>
      </div>
  )
}

export default CreatedOrphanages