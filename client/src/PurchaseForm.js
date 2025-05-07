import React, { useEffect, useState } from 'react';
import './PurchaseForm.css';

function PurchaseForm() {
    const [products, setProducts] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [form, setForm] = useState({
        productId: '',
        customerName: '',
        quantity: 1
    });

    // Load products
    useEffect(() => {
        fetch('https://obscure-potato-jj75w9w5gww7fp5r4-5000.app.github.dev/api/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    // Load purchases
    useEffect(() => {
        fetch('https://obscure-potato-jj75w9w5gww7fp5r4-5000.app.github.dev/api/purchases')
            .then(res => res.json())
            .then(data => setPurchases(data));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('https://obscure-potato-jj75w9w5gww7fp5r4-5000.app.github.dev/api/purchases', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        });

        if (res.ok) {
            alert("✅ Purchase recorded!");
            setForm({ productId: '', customerName: '', quantity: 1 });

            // Refresh purchases
            const updated = await fetch('https://obscure-potato-jj75w9w5gww7fp5r4-5000.app.github.dev/api/purchases');
            const updatedData = await updated.json();
            setPurchases(updatedData);
        } else {
            alert("❌ Failed to record purchase.");
        }
    };

    return (
        <div className="purchase-form-container">
            <h2>📋 Purchase Product</h2>
            <form onSubmit={handleSubmit}>
                <select name="productId" value={form.productId} onChange={handleChange} required>
                    <option value="">Select Product</option>
                    {products.map(product => (
                        <option key={product._id} value={product._id}>{product.name}</option>
                    ))}
                </select>
                <input
                    name="customerName"
                    placeholder="Customer Name"
                    value={form.customerName}
                    onChange={handleChange}
                    required
                />
                <input
                    name="quantity"
                    type="number"
                    min="1"
                    value={form.quantity}
                    onChange={handleChange}
                />
                <button type="submit">Submit Purchase</button>
            </form>

            {/* Purchase list */}
            <div style={{ marginTop: '2rem' }}>
                <h3>🧾 Purchase Records</h3>
                {purchases.length === 0 ? (
                    <p>No purchases yet.</p>
                ) : (
                    <ul>
                        {purchases.map(purchase => {
                            const product = products.find(p => p._id === purchase.productId);
                            return (
                                <li key={purchase._id}>
                                    <strong>{purchase.customerName}</strong> bought <strong>{product?.name || 'Unknown Product'}</strong> (x{purchase.quantity})
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default PurchaseForm;
