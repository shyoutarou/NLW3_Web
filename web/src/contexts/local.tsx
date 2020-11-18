import React, { createContext, useState, useContext } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

interface Coordenadas {
    lat: string
    lon: string
    address: {
      city: string
      town: string
      state: string
      state_code: string
      region: string
      country: string
      country_code: string
    }
  }

  
interface IBGEUFProps {
    sigla: string;
    nome: string;
}

interface LocalContextData {
    isable: boolean;
    local: Coordenadas;
    setcurrentlocal(): void;
    Handleselectedlocal(estado: string, sigla: string, cidade :string): Promise<void>;
    clearlocal(): void
}

const LocalContext = createContext<LocalContextData>({} as LocalContextData);

const LocalProvider: React.FunctionComponent = ({ children }) => {

    const [coordenadas, setcoordenadas] = useState<Coordenadas>(() => {
        
        if (localStorage.getItem('@happy:latitude')) {

            return {lat: localStorage.getItem('@happy:latitude'),
            lon: localStorage.getItem('@happy:longitude'),
            address: { state:  localStorage.getItem('@happy:estado'),
            state_code: localStorage.getItem('@happy:sigla'),
            city:  localStorage.getItem('@happy:cidade') } } as Coordenadas;
          }

        return {} as Coordenadas;
    });

    async function setcurrentlocal() {

        if(navigator.geolocation && !localStorage.getItem('@happy:latitude')) {

            await navigator.geolocation.getCurrentPosition(showposition => {
    
                const lat = showposition.coords.latitude.toString();
                const lon = showposition.coords.longitude.toString();

                const url = `https://nominatim.openstreetmap.org/reverse?addressdetails=1&lat=${lat}&lon=${lon}&format=json`

                axios.get<Coordenadas>(url)
                .then(response => {
        
                    const localidade = response.data;

                    localStorage.setItem('@happy:latitude', lat);
                    localStorage.setItem('@happy:longitude', lon);
                    localStorage.setItem('@happy:estado', localidade.address.state);
                    localStorage.setItem('@happy:cidade', localidade.address.town? localidade.address.town: localidade.address.city);   

                    axios.get<IBGEUFProps[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
                    .then(ibgeresp => {
                            
                    const siglas  = ibgeresp.data.find(uf => uf.nome === localidade.address.state);
        
                    localStorage.setItem('@happy:sigla', String(siglas?.sigla));

                    localidade.address.state_code = String(siglas?.sigla);

                    setcoordenadas(localidade)

                    }).catch(error => toast.error('Ocorreu um erro ao recuperar dados do IBGE'));

                }).catch(error => toast.error('Ocorreu um erro ao determinar sua localização.'));
                }, (error => {

                clearlocal();
                toast.success('Selecione um estado e cidade para determinar sua localização.');            
            }))
        } 
    }

    async function Handleselectedlocal(estado: string, sigla: string, cidade: string) {

        const localidade = { address: {state: estado, state_code: sigla} } as Coordenadas;

        if(cidade === "0") 
        {
            localStorage.removeItem('@happy:latitude');
            localStorage.removeItem('@happy:longitude');
            localStorage.removeItem('@happy:cidade');  
            setcoordenadas(localidade);
            return
        }

        const url = `https://nominatim.openstreetmap.org/search?addressdetails=1&city=${cidade}&state=${estado}&country=Brasil&format=json&limit=1`

        await axios.get<Coordenadas[]>(url)
        .then(response => {

            const localidade = response.data[0];

            localStorage.setItem('@happy:latitude', localidade.lat);
            localStorage.setItem('@happy:longitude', localidade.lon);
            localStorage.setItem('@happy:estado', localidade.address.state);
            localStorage.setItem('@happy:sigla', sigla);
            localStorage.setItem('@happy:cidade', localidade.address.town? localidade.address.town: localidade.address.city);   

            localidade.address.state_code = sigla;
            setcoordenadas(localidade);

        }).catch(error => toast.error('Ocorreu um erro ao determinar sua localização'));
    }

    function clearlocal() {
        localStorage.removeItem('@happy:latitude');
        localStorage.removeItem('@happy:longitude');
        localStorage.removeItem('@happy:sigla');
        localStorage.removeItem('@happy:estado');
        localStorage.removeItem('@happy:cidade');  
        setcoordenadas({} as Coordenadas);
    }

    return(
        <LocalContext.Provider value={{isable: !!coordenadas.lat, local: coordenadas, setcurrentlocal, Handleselectedlocal, clearlocal}}>
            {children}
        </LocalContext.Provider>
    );
};

function useLocal() {
    const context = useContext(LocalContext);

    if (!context) {
        throw new Error('useLocal must be used within an LocalProvider.');
      }
      
    return context;
}

export {LocalProvider, useLocal} ;