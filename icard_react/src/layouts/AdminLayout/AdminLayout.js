import React from 'react';
import {SideMenu} from "../../Components/Admin";
import {LoginAdmin} from "../../pages/Admin";
import {TopMenu} from "../../Components/Admin";
import {useAuth} from "../../hooks";
import "./AdminLayout.scss";



//creacion de vista administrador

export function AdminLayout(props) {
    const{children}=props;
    const {auth} = useAuth();
    //console.log(useAuth());
    //Cuando usuario esta logeado
    //const auth = null;

    if (!auth) return <LoginAdmin/>;
  
  return (
    <div className='admin-layout'>

        <div className='admin-layout__menu'>
          <TopMenu/>
        </div>


      <div className='admin-layout__main-content'>
        <SideMenu> {children} </SideMenu>
      </div> 
    
    
    </div>
  );
}
