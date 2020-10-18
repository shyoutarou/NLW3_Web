import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';

interface User {
    id?: number;
    name?: string;
    surname?: string;
    email: string;
    password: string;
}

interface AuthState {
    token: string;
    user: User;
  }


interface AuthContextData {
    signed: boolean;
    user: User;
    signIn(email: string, password :string, remember: boolean): Promise<void>;
    signOut(): void;
    handleToggleRemember(token: string, user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FunctionComponent = ({ children }) => {

    const [data, setData] = useState<AuthState>(() => {
        let token = localStorage.getItem('@proffy:token');
        if (!token) {
          token = sessionStorage.getItem('@proffy:token');
        }
    
        let Storageduser = localStorage.getItem('@proffy:user');
    
        if (!Storageduser) {
            Storageduser = sessionStorage.getItem('@proffy:user');
        }
    
        // if (token && Storageduser) {
        //   api.defaults.headers.authorization = `Bearer ${token}`;
    
        //   return { token, user: JSON.parse(Storageduser) };
        // }
    
        return {} as AuthState;
    });

    function handleToggleRemember(token: string, user: User){
        setData({ token, user });
    }

    async function signIn(email: string, password: string, remember: boolean) {

        // const login = await api.post('auth', {
        //     email,
        //     password,
        //   });

        const { token, user } = { token: "1234",  user: {id: 1, name: "Jão", email: "joa@gmail.coom", password: "1234" } };

        console.log(token, user);
        // api.defaults.headers.authorization = `Bearer ${token}`;

        // if (remember) {
        //     localStorage.setItem('@happy:token', token);
        //     localStorage.setItem('@happy:user', JSON.stringify(user));

        // } else {
        //     sessionStorage.setItem('@happy:token', token);
        //     sessionStorage.setItem('@happy:user', JSON.stringify(user));
        // }
    
        setData({ token, user });

    }

    function signOut() {
        localStorage.clear();
        sessionStorage.clear();
        setData({} as AuthState);
    }

    return(

        <AuthContext.Provider value={{signed: !!data.token,user: data.user, signIn, signOut, handleToggleRemember}}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider.');
      }
      
    return context;
}

export {AuthProvider, useAuth} ;