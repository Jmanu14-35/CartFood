import React , {useCallback, useState} from 'react';
import {Form, Image, Button} from "semantic-ui-react";
import {useDropzone} from "react-dropzone";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useCategory} from "../../../../hooks";
import "./AddEditCAtegoryForm.scss";


export function AddEditCAtegoryForm(props) {
    const {onClose, category} = props;
  const [previewImage, setPreviewImage] = useState(category?.image || null);
  const {addCategory, updateCategory} = useCategory();

  console.log(category);

  const formik = useFormik({
    initialValues: initialValues(category),
    validationSchema: Yup.object(category? updateSchema():newSchema()),
    validateOnChange:false,
    onSubmit: async (formValue) => {
      try {
        if(category) updateCategory(category.id, formValue)
        else await addCategory(formValue);
        onClose();
        console.log("Formulario Enviado");
        console.log(formValue);
      } catch (error) {
        console.error(error);
      }
    }
  })

  const onDrop = useCallback(async(accepteFile)=>{
    const file = accepteFile[0];
    await formik.setFieldValue("image", file);
    setPreviewImage(URL.createObjectURL(file));
  }, []);

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    multiple:false,
    onDrop
  })

  return (
    <Form className='add-edit-category-form' onSubmit={formik.handleSubmit}>
      <Form.Input name="title" placeholder="Nombre de la Categoria" value={formik.values.title} onChange={formik.handleChange} error={formik.errors.title}/>

      <Button type='button' fluid color={formik.errors.image && "red"} {...getRootProps()} >
        {previewImage? "Cambiar Imagen":"Subir Imagen"}
      </Button>

      <input {...getInputProps()}/>

      <Image src={previewImage} fluid/>
      
      <Button type='submit' primary fluid content={category? "Actualizar": "Crear"}>

      </Button>
    </Form>
  )
}

function initialValues(data){
  return{
    title:data?.title || "",
    image:"",
  }
}

function newSchema(){
  return{
    title: Yup.string().required(true),
    image: Yup.string().required(true),
  }
}

function updateSchema(){
  return{
    title: Yup.string().required(true),
    image: Yup.string(),
  }
}