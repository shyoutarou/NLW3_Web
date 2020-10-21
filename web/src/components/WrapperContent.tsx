import React , { FC } from 'react'
import SidebarForm from './SidebarForm';
import Sidebar from './Sidebar';
import SidebarMap from './SidebarMap';
import '../styles/components/wrappercontent.css';

interface WrapperProps {
  id: string,
  className: string,
  container?: string,
  logout?: boolean
}

const WrapperContent: FC<WrapperProps> = ({ children, id, className, container, logout }) => {
  return (
    <div id={id} className={className}>
      {container == 'form'? <SidebarForm />  : container == 'map'? 
        <SidebarMap/> : container == 'pending'?  
        <Sidebar logout={logout} pending /> : 
        <Sidebar logout={logout}/> }
      {children}
    </div>
  )
}

export default WrapperContent