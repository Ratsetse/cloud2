const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const purchaseRoutes = require('./routes/purchaseRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.send('🌐 API Running');
});

app.use('/api/purchases', purchaseRoutes);
app.use('/api/products', productRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
