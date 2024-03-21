import React from 'react';
import "./TableUsers.scss";
import {Table, Button, Icon} from "semantic-ui-react";
import {map} from "lodash";

export function TableUsers(props) {
  const {users, updateUser, onDeleteUser} = props;

  return (
      <Table className='table-users-admin'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>UserName</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Nombre</Table.HeaderCell>
            <Table.HeaderCell>Apellido</Table.HeaderCell>
            <Table.HeaderCell>Activo</Table.HeaderCell>
            <Table.HeaderCell>Staff</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {map(users, (user, index)=>(
            <Table.Row key={index}>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.first_name}</Table.Cell>
              <Table.Cell>{user.last_name}</Table.Cell>
              <Table.Cell className='status'> 
                {user.is_active ? <Icon name='check'/> : <Icon name='close'/>}
              </Table.Cell>
              <Table.Cell className='status'> 
                {user.is_staff ? <Icon name='check'/> : <Icon name='close'/>}
              </Table.Cell>
              <Table.Cell><Actions user={user} updateUser={updateUser} onDeleteUser={onDeleteUser}/></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>    
    )
}

//Se controla Centro de Funciones
function Actions(props){
  const {user, updateUser, onDeleteUser} = props;
  return(
  <Table.Cell textAlign='right'>
    <Button icon onClick={() => updateUser(user)}>
      <Icon name='pencil'/>  
    </Button> 
    <Button icon negative onClick={()=> onDeleteUser(user)}>
      <Icon name='close'/>
    </Button>
  </Table.Cell>
  );
}