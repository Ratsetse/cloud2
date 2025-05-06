import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div>
            <h2>{product.name}</h2>
            <img src={product.imageUrl} alt={product.name} width="300" />
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
        </div>
    );
}

export default ProductDetail;
