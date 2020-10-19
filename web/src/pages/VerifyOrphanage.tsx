import React, { ChangeEvent, FormEvent, useState } from "react"
import { Map, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'

import { FiPlus, FiX, FiXCircle, FiCheck } from "react-icons/fi"

import '../styles/pages/create-orphanage.css'
import mapIcon from "../utils/mapIcon"
import api from "../services/api"
import { useHistory } from "react-router-dom"
import WrapperContent from "../components/WrapperContent"

export default function VerifyOrphanage() {

  const { push } = useHistory()

  const [position, setPosition] = useState({ lat: 0, lng: 0 })


  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const handleMapClick = (event: L.LeafletMouseEvent) => {
    setPosition({
      lat: event.latlng.lat,
      lng: event.latlng.lng
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { lat: latitude, lng: longitude } = position
  
    const data = new FormData()
    data.append('name', name)
    data.append('latitude', String(latitude))
    data.append('longitude', String(latitude))
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))
    images.forEach(img => {
      data.append('images', img)
    })

    try {
      await api.post('/orphanages', data)
      alert('Cadastro realizado com sucesso!')
      push('/app')
    } catch {
      alert('Erro ao cadastrar')
    }
  }

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) {
      return
    }
    const selectedImages = Array.from(e.target.files)
    setImages(selectedImages)
    const selectedImagesPreview = selectedImages.map(img => {
      return URL.createObjectURL(img)
    })
    setPreviewImages(selectedImagesPreview)
  }

  const removeImage = (removeIndex: number) => {
    const newPreviewImages = previewImages.filter((img, index) => index !== removeIndex)
    const newImages = images.filter((img, index) => index !== removeIndex)
    setImages(newImages)
    setPreviewImages(newPreviewImages)
  }

  return (
    <WrapperContent id="page-create-orphanage" className="page-content-left" 
      container="detail" logout>

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer 
                url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />

              {position.lat !== 0 && position.lng !== 0 && (
                <Marker interactive={false} icon={mapIcon} position={[position.lat,position.lng]} />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="about" maxLength={300} value={about} onChange={e => setAbout(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

                {previewImages.map((img, index) => {
                  return (
                    <div className="img-container">
                      <div className="close" onClick={() => removeImage(index)}>
                        <FiX size={20} color='black' />
                      </div>
                      <img src={img} key={index} alt={name}></img>
                    </div>
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

                <input hidden multiple onChange={handleSelectImages} type="file" id="image[]"/>
              </div>

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={e => setOpeningHours(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button onClick={() => setOpenOnWeekends(true)}
                type="button" className={open_on_weekends ? 'active' : ''}>Sim</button>
                <button onClick={() => setOpenOnWeekends(false)}
                type="button" className={!open_on_weekends ? 'active' : ''}>Não</button>
              </div>
            </div>
          </fieldset>

          <div className="verify-orphanage-buttons">
            <button className="verify-confirm-button" type="submit">
                <FiCheck size={20} color='white' /> Confirmar
            </button>
            <button className="verify-deny-button" type="submit">
                <FiXCircle size={20} color='white' /> Recusar
            </button>
          </div>
        </form>
      </main>
    </WrapperContent>
  );
}

