// src/ProductList.js
import React, { useEffect, useState } from 'react';

function ProductList({ canDelete = false }) {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {products.map((product) => (
                <div key={product._id} style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '10px',
                    width: '200px',
                    textAlign: 'center'
                }}>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: '150px', height: 'auto' }}
                    />

                    <h4>{product.name}</h4>
                    <p>${product.price}</p>
                    <p>{product.description}</p>
                    {canDelete && (
                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default ProductList;
