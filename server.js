const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const secretRoutes = require('./routes/secrets');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes will be added here
app.use('/api/auth', authRoutes);
app.use('/api/secrets', secretRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
