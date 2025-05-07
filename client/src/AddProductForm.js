// src/AddProductForm.js
import React, { useState } from 'react';

function AddProductForm({ onProductAdded }) {
    const [form, setForm] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        imageUrl: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('https://obscure-potato-jj75w9w5gww7fp5r4-5000.app.github.dev/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        const data = await res.json();
        if (res.ok) {
            setMessage('✅ Product added successfully!');
            setForm({ name: '', price: '', description: '', category: '', imageUrl: '' });
            onProductAdded(); // Trigger refresh
        } else {
            setMessage('❌ Failed to add product');
            console.error(data);
        }
    };

    return (
        <div style={{ marginBottom: '2rem' }}>
            <h3>Add New Product</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" required />
                <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" />
                <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
                <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
                <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image file name (e.g. apple.jpg)" />
                <button type="submit">Add Product</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default AddProductForm;
