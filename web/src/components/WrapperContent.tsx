import React , { FC } from 'react'
import SidebarForm from './SidebarForm';
import Sidebar from './Sidebar';
import SidebarMap from './SidebarMap';
import '../styles/components/wrappercontent.css';
import SidebarLanding from './SidebarLanding';

interface WrapperProps {
  id: string,
  className: string,
  container?: string,
  logout?: boolean
}

const WrapperContent: FC<WrapperProps> = ({ children, id, className, container, logout }) => {
  return (
    <div id={id} className={className}>
      { container === 'landing'? <SidebarLanding />  : 
        container === 'form'? <SidebarForm />  : container === 'map'? 
        <SidebarMap/> : 
        <Sidebar logout={logout} container={container} /> }
      {children}
    </div>
  )
}

export default WrapperContent