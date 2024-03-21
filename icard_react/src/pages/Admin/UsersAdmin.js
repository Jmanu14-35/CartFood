import React, {useState, useEffect} from 'react';
import {Loader} from "semantic-ui-react";
import {useUser} from "../../hooks";
import {ModalBasic} from "../../Components/Common"
import {HeaderPage, TableUsers, AddEditUserForm} from "../../Components/Admin";

export function UsersAdmin() {
  const{ loading, users,getUsers, deleteUser } = useUser();

  const [titleModal, setTitleModal] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [contentModal, setContentModal] = useState(null)
  const [refetch, setRefetch] = useState(false)

  useEffect(() => getUsers(), [refetch]);
  
  const openCloseModal = () => setShowModal ((prev) => !prev);

  const onRefetch = () => setRefetch((prev) =>  !prev);

  const addUser = () => {
    setTitleModal("Nuevo Usuario");
    setContentModal(< AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch}/>);
    openCloseModal();
  };

  //FUNCION DE ACTUALIZACION DE USUARIO

  const updateUser = (data) => {
    setTitleModal("Actualizar usuario");
    setContentModal (< AddEditUserForm onClose={openCloseModal} onRefetch={onRefetch} user={data}/>)
    openCloseModal();
    console.log("Editar Usuario");
    console.log(data);
  }

  const onDeleteUser=async (data) => {
    const result = window.confirm (`¿Eliminar Usuario? ${data.email}`);

    if (result){
      try {
        await deleteUser(data.id);
      } catch (error) {
        console.error(error);
      }
      
    }
  }


  return (
    <>
        <HeaderPage title="Usuarios" btnTitle="Nuevo Usuario" btnClick={addUser}/>
        {loading ? (
            <Loader active inline="centered">
              Cargando ...
            </Loader>
        ):(
          <TableUsers users={users} updateUser={updateUser} onDeleteUser={onDeleteUser}/>
        )}

        <ModalBasic show={showModal} onClose ={openCloseModal} title={titleModal}children={contentModal}/>
    </>
  )
}
