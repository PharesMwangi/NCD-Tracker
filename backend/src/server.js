const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/db')
const patientRoutes = require('./routes/healthDataRoutes');


const app = express();

// Middleware
app.use(cors({
    origin: [
        process.env.ALLOWED_ORIGIN,
        'https://ncd-tracker.vercel.app'
    ],
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());

//connect to db
connectDB();

// Routes
app.get("/", (req, res) => res.send("Patientss API is up and running..."));
app.use('/api/patients', patientRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API is on http://localhost:${PORT}`));
