const express = require('express');
const cors = require('cors');
// const connectDB = require('./config/db');

// Import routes
const productRoutes = require('./routes/productRoutes');
// const userRoutes = require('./routes/userRoutes');
// const orderRoutes = require('./routes/orderRoutes');

// Connect to the database
// connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/orders', orderRoutes);

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});