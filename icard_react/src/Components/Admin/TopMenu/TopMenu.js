import React from 'react';
import {Icon, Menu} from "semantic-ui-react";
import "./TopMenu.scss";
import {useAuth} from "../../../hooks"


export  function TopMenu() {
    //Realizar llamado de Hooks para obtener informacion de usuario logueado
    //Funcion de deslogueo de usuario.
    const{auth, logout}=useAuth();
    //console.log(auth);

    //Funcion Obtener Nombre
    const renderName = () => {
        if(auth.me?.first_name && auth.me?.last_name){
            return `${auth.me.first_name} ${auth.me.last_name}`;
        }
        return auth.me?.email;
    }

  return (
    <Menu fixed='top' className='top-menu-admin'>
        <Menu.Item className='top-menu-admin__logo'>
            <p>iCard Admin</p>
        </Menu.Item>

        <Menu.Menu position='right'>
            <Menu.Item>Hola,{renderName()}</Menu.Item>
            <Menu.Item onClick={logout}><Icon name='sign-out'/></Menu.Item>
        </Menu.Menu>
    </Menu>
  )
}
