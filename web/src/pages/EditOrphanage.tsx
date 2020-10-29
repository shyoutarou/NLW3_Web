import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Map, Marker, TileLayer } from 'react-leaflet'
import L from 'leaflet'

import { FiPlus, FiX, FiXCircle, FiCheck } from "react-icons/fi"

import '../styles/pages/create-orphanage.css'
import mapIcon from "../utils/mapIcon"
import api from "../services/api"
import { useHistory, useParams } from "react-router-dom"
import WrapperContent from "../components/WrapperContent"

import { useAuth } from '../contexts/auth'
import { toast } from "react-toastify"

interface OrphanageParams {
  id: string;
  tela: string;
}

interface IOrphanage {
  id: number
  name: string
  latitude: number
  longitude: number
  about: string
  whatsapp: string
  instructions: string
  opening_hours: string
  open_on_weekends: boolean
  images: {
    id: number
    url: string
  }[]
}

export default function EditOrphanage() {


  const history = useHistory()
  const params = useParams<OrphanageParams>();
  
  const [position, setPosition] = useState({ lat: 0, lng: 0 })
  const { user } = useAuth();

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [whatsapp, setWhatsApp] = useState('');
  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [permission, setpermission] = useState(true)
  const [tela, settela] = useState("edit")

  const [orphanage, setOrphanage] = useState<IOrphanage>()

  useEffect(() => {
    if(!params) {
      return history.push('/pendinglist')
    }

    settela( window.location.href.indexOf("verify") !== -1 ? "verify" : "edit" )

    api.get<IOrphanage>(`orphanages/${params.id}`).then(res => {
      setOrphanage(res.data)
      setName(res.data.name)
      setAbout(res.data.about)
      setWhatsApp(res.data.whatsapp)
      setInstructions(res.data.instructions)
      setOpenOnWeekends(res.data.open_on_weekends)
      setOpeningHours(res.data.opening_hours)
      setPreviewImages(res.data.images.map(e => e.url))
      
      setPosition({
        lat: res.data.latitude,
        lng: res.data.longitude
      })

    }).catch(error => toast.error('Ocorreu um erro ao recuperar o orfanato'));
  }, [params, history])
  
  const handleMapClick = (event: L.LeafletMouseEvent) => {
    setPosition({
      lat: event.latlng.lat,
      lng: event.latlng.lng
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    let msg_1 = tela === "verify" ? (permission ? 'favoritado': 'recusado') : "editado" ;
    let msg_2 = tela === "verify" ? (permission ? 'favoritar': 'recusar') : "editar" ;
    const { lat: latitude, lng: longitude } = position;

    try {    
      await api.put(`orphanages/update/${params.id}`, 
        (tela === "verify" ?
        {user_id : user.id, name, latitude, longitude, about, whatsapp,
        instructions, opening_hours, open_on_weekends, permission}
        :
        {user_id : user.id, name, latitude, longitude, about, whatsapp,
          instructions, opening_hours, open_on_weekends}
        )
      ).then(response => {

        const { id } = response.data;
        const dataimg =  new FormData();
    
        images.forEach(image => { dataimg.append('images', image); });
    
        api.put(`orphanages/images/${id}`, dataimg);
    
        toast.success(`O orfanato foi ${msg_1} com sucesso`);
        (tela === "verify" && !permission ? history.push('/approvedlist') : history.push('/pendinglist') );   

      }).catch(error => toast.error(`Ocorreu um erro ao ${msg_2} o cadastro`));

    } catch(e) {
      toast.error(`Ocorreu um erro ao ${msg_2} o orfanato`);
    }
  }
    
  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return; 
    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages);
    selectedImages.forEach(image => {
      const imageurl =  URL.createObjectURL(image)
      setPreviewImages(previewImages => ([...previewImages, imageurl]))
    });
  }

  const removeImage = (removeIndex: number) => {
    const newPreviewImages = previewImages.filter((img, index) => index !== removeIndex)
    const newImages = images.filter((img, index) => index !== removeIndex)
    setImages(newImages)
    setPreviewImages(newPreviewImages)
  }

  if(!orphanage) {
    return <h1>Carregando</h1>
  }

  return (
    <WrapperContent id="page-create-orphanage" className="page-content-left" 
      container="verify">

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[orphanage.latitude,orphanage.longitude]} 
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
              <label htmlFor="name">Whatsapp</label>
              <input
                id="Whatsapp"
                value={whatsapp}
                onChange={event => setWhatsApp(event.target.value)}
              />
            </div>


            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

                {previewImages.map((img, index) => {
                  return (
                    <div  key={index} className="img-container">
                      <div className="close" onClick={() => removeImage(index)}>
                        <FiX size={20} color='black' />
                      </div>
                      <img src={img}  alt={name}></img>
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

          { tela === "verify" ?  
           (
            <div className="verify-orphanage-buttons">
              <button onClick={() => setpermission(true)}  className="verify-confirm-button" type="submit">
                  <FiCheck  size={20} color='white' /> Favoritar
              </button>
              <button onClick={() => setpermission(false)}   className="verify-deny-button" type="submit">
                  <FiXCircle size={20} color='white' /> Recusar
              </button>
            </div>
           ) :

           (
              <button className="confirm-button" type="submit">
                Confirmar
              </button>
           )
        
        
          }
        </form>
      </main>
    </WrapperContent>
  );
}

