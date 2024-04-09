const express = require('express');
const cors = require('cors');
const { connectDB, initDB } = require('./modules/dbInit/dbInit');
const cookieParser = require('cookie-parser');
// Import routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/CartRoutes');
const paymentRoutes = require('./routes/PaymentRoutes');
const userRoutes = require('./routes/userRoutes');
// Import the authNewUserReg router
const authNewUserRegRoutes = require('./modules/auth_newUserReg/auth_newUserReg');


const app = express();

// // Middleware
// CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // Set to match the requesting origin
    credentials: true, // Required to include credentials like cookies
};

// Apply CORS middleware with the specified options
app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());

app.use(cookieParser());

// Establish connection to the database and initialize it
(async () => {
    await connectDB();
    await initDB();

    // // Mount routes after DB initialization
    // app.use('/api/products', productRoutes);


    // Mount the auth_newUserReg routes
    app.use('/api/auth', authNewUserRegRoutes); // This line includes all the authentication and user registration routes
    app.use('/api/cart', cartRoutes);
    app.use('/api/payment', paymentRoutes);
    app.use('/api/users', userRoutes);

    // Start the server
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})();
