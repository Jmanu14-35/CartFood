import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../../hooks";
import { ListProducts } from "../../components2/Client";

export function Products() {
  const { tableNumber, idCategory } = useParams();
  const { loading, products, getProductsByCategory } = useProduct();

  useEffect(() => { getProductsByCategory(idCategory) }, [idCategory]);

  return (
    <div>
      <Link to={`/client/${tableNumber}`}>Volver a categorias</Link>

      {loading ? <p>Cargando...</p> : <ListProducts products={products} />}
    </div>
  );
}
