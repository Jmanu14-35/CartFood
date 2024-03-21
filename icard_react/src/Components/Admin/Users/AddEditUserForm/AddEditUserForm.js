import React from 'react';
import {Form, Button, Checkbox} from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../../../hooks";
import "./AddEditUserForm.scss";




export function AddEditUserForm(props) {

  const { onClose, user } = props;
  const { addUser, updateUser } = useUser();
  
  const formik = useFormik({
      initialValues: initialValues(user),
      validationSchema: Yup.object(user? updateSchame():newSchame()),
      validateOnChange: false,
      onSubmit: async(formValue) => {
        try {
          if (user) await updateUser(user.id, formValue);
          else await addUser(formValue);
          //console.log("Usuario Creado Correctamente")
          //onRefetch();
          onClose();
        } catch (error) {
          console.error(error);
        }
      }
  })


  return (
    <Form className='add-edit-user-form' onSubmit={formik.handleSubmit}>
        <Form.Input name="username" placeholder="Nombre de Usuario" value={formik.values.username} onChange={formik.handleChange} error={formik.errors.username}/>
        <Form.Input name="email" placeholder="Correo Electronico" value={formik.values.email} onChange={formik.handleChange} error={formik.errors.email}/>
        <Form.Input name="first_name" placeholder="Nombre" value={formik.values.first_name} onChange={formik.handleChange} error={formik.errors.first_name}/>
        <Form.Input name="last_name" placeholder="Apellidos" value={formik.values.last_name} onChange={formik.handleChange} error={formik.errors.last_name}/>
        <Form.Input name="password" type="password" placeholder="Contraseña" value={formik.values.password} onChange={formik.handleChange} error={formik.errors.password}/>
        
    <div className='add-edit-user-form__active'>
        <Checkbox toggle checked={formik.values.is_active} onChange={(_, data) => formik.setFieldValue("is_active",data.checked)}/> Usuario Activo
    </div>

    <div className='add-edit-user-form__staff'>
        <Checkbox toggle checked={formik.values.is_staff} onChange={(_, data) => formik.setFieldValue("is_staff",data.checked)}/> Usuario Administrador
    </div>

    <Button type='submit' primary fluid content={user ? "Actualizar" : "Crear"}/>
    </Form>
  )
}

function initialValues(user){
  return{
    username:user?.username || "",
    email:user?.email || "",
    first_name:user?.first_name || "",
    last_name:user?.last_name || "",
    password: "",
    is_active: user?.is_active? true : false,
    is_staff: user?.is_staff? true : false,
  }

}

function newSchame(){
  return{
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string(),
    last_name: Yup.string(),
    password: Yup.string().required(true),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true)

  }
}

//UPDATE SCHEMA

function updateSchame(){
  return{
    username: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    first_name: Yup.string(),
    last_name: Yup.string(),
    password: Yup.string(),
    is_active: Yup.bool().required(true),
    is_staff: Yup.bool().required(true)

  };
}
