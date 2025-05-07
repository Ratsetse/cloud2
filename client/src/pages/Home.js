import React, { useEffect, useState } from 'react';
import ProductList from '../ProductList';
import './Home.css';

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://obscure-potato-jj75w9w5gww7fp5r4-5000.app.github.dev/api/products')
            .then((res) => res.json())
            .then((data) => {
                console.log('📦 Products from backend:', data);
                setProducts(data);
            })
            .catch((err) => console.error('Error fetching products:', err));
    }, []);

    return (
        <div className="home-container">
            <h2 className="home-title">Available Products</h2>
            <div className="product-grid">
                <ProductList products={products} canDelete={false} />
            </div>
        </div>
    );
}

export default Home;
