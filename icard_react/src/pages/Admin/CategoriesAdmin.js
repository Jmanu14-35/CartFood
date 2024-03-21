import React, {useEffect, useState} from 'react';
import {Loader} from "semantic-ui-react";
import { HeaderPage, TableCategoryAdmin, AddEditCAtegoryForm } from "../../Components/Admin";
import {useCategory} from "../../hooks";
import {ModalBasic} from "../../Components/Common";

export function CategoriesAdmin() {
    const[showModal, setShowModal] = useState(false);
    const[titleModal, setTitleModal] = useState(null);
    const[contentModal, setContentModal] = useState(null);
    const{loading, categories, getCategories, deleteCategory} = useCategory();
    console.log(categories);
    
    useEffect(() => getCategories(), []);
    
    const openCloseModal = () => setShowModal((prev) => !prev);

    const addCategory = () => {
        setTitleModal("Nueva Categoria");
        setContentModal(<AddEditCAtegoryForm onClose={openCloseModal}/>)
        openCloseModal();
    }

    const updateCategory = (data) =>{
        setTitleModal("Actualizar Categoria");
        setContentModal(<AddEditCAtegoryForm onClose={openCloseModal} category={data}/>);
        openCloseModal();        
    }

    const onDeleteCategory = async(data) =>{
    const result = window.confirm(`¿Eliminar Categoria? ${data.title}`);
        if (result) {
            await deleteCategory(data.id)
        }
    }

    return (
    <>
        <HeaderPage title="Categorias" btnTitle="Nueva Categoria" btnClick={addCategory}/>
        {loading ? (
            <Loader active inline="centered">
                Cargando ...
            </Loader>
        ):(
            <TableCategoryAdmin
            categories={categories}
            updateCategory={updateCategory}
            deleteCategory={onDeleteCategory}
            />
        )}
        <ModalBasic
        show={showModal}
        onClose={openCloseModal}
        title={titleModal}
        children={contentModal}
        />
    </>
)
}
