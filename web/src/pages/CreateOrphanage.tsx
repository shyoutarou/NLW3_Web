import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from "react-router-dom";

import { FiPlus, FiX } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';

import mapIcon from '../utils/mapIcon';
import api from "../services/api";
import { toast } from 'react-toastify'
import WrapperContent from "../components/WrapperContent";

export default function CreateOrphanage() {

  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0})

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [whatsapp, setWhatsApp] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [permission, setpermission] = useState(false);
  const [mapPosition, setMapPosition] = useState({ lat: -23.539417, lng: -46.560972})
  
  useEffect(() => {

    setpermission(false)
    setMapPosition({
      lat:  Number(localStorage.getItem('@happy:latitude')),
      lng:  Number(localStorage.getItem('@happy:longitude'))
    })
  }, [])
  
  function handleMapClick(event: LeafletMouseEvent) {
    setPosition({
      latitude: event.latlng.lat,
      longitude: event.latlng.lng
    });
  }
  
  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return; 
    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages);
    selectedImages.forEach(image => {
      const imageurl =  URL.createObjectURL(image)
      setPreviewImages(previewImages => ([...previewImages, imageurl]))
    });

    console.log(previewImages)
  }

  const removeImage = (removeIndex: number) => {
    const newPreviewImages = previewImages.filter((img, index) => index !== removeIndex)
    const newImages = images.filter((img, index) => index !== removeIndex)
    setImages(newImages)
    setPreviewImages(newPreviewImages)
  }

  async function handleSubmit(event: FormEvent) {

    event.preventDefault();
    const { latitude, longitude } = position;
   
    try {
        await api.post('orphanages', {name, latitude, longitude, about, whatsapp,
        instructions, opening_hours, open_on_weekends, permission}).then(response => {

          const { id } = response.data;
          const dataimg =  new FormData();
      
          images.forEach(image => {dataimg.append('images', image);});
      
          api.put(`orphanages/images/${id}`, dataimg);
      
          toast.success('Cadastro realizado com sucesso!');
          history.push('/app');   

      }).catch(error => toast.error('Ocorreu um erro ao fazer o cadastro'));
    } catch(e) {
      toast.error('Ocorreu um erro ao fazer o cadastro');
    }
  }
  
  return (
    <WrapperContent id="page-create-orphanage" 
        className="page-content-left" 
        container="detail">
      <main>
        <form onSubmit={handleSubmit}  className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[mapPosition.lat, mapPosition.lng]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />


              { position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
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
                {previewImages.map((image, index) => {
                  return (
                    <div key={index} className="img-container">
                      <div className="close" onClick={() => removeImage(index)}>
                        <FiX size={20} color='black' />
                      </div>
                      <img src={image} alt={name}></img>
                    </div>
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
                <input type="file"  multiple id="image[]" onChange={handleSelectImages} />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcinamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" 
                        className={open_on_weekends ? 'active' : ''}
                        onClick={() => setOpenOnWeekends(true)}>
                          Sim
                        </button>
                <button type="button"
                        className={!open_on_weekends ? 'active' : ''}
                        onClick={() => setOpenOnWeekends(false)}>
                          Não
                        </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </WrapperContent>
  );
}

