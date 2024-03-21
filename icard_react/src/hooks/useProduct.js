
import { useState } from 'react';
import { getProductsApi, addProductApi } from '../api/product';
import { useAuth } from './';

export function useProduct() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState(null);
    const { auth } = useAuth();

    const getProducts = async () => {
        try {
            setLoading(true);
            const response = await getProductsApi();
            setLoading(false);
            setProducts(response);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    const addProduct = async (data) => {
        try{
            setLoading(true);
            await addProductApi(data, auth.token);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        products,
        getProducts,
        addProduct
    };
}