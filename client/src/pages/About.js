// src/pages/About.js
import React, { useState } from 'react';
import './About.css';
import AddProductForm from '../AddProductForm';
import ProductList from '../ProductList';

function About() {
    const [refresh, setRefresh] = useState(false);

    const handleProductAdded = () => {
        setRefresh(!refresh); // Trigger a re-render to refresh ProductList
    };

    return (
        <div className="about-container">
            <h2 className="about-title">🛠️ Admin Product Management</h2>
            <AddProductForm onProductAdded={handleProductAdded} />
            <ProductList key={refresh} canDelete={true} />
        </div>
    );
}

export default About;
