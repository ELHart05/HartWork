require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const workoutRoutes = require('../routes/workoutRoutes.js');
const userRoutes = require('../routes/userRoutes.js')

const app = express();

mongoose.set('strictQuery', true);
app.use(cors())
app.use(express.json());
app.use('/api/workouts', workoutRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`connected to the db & server start listening on port ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log(err.message);
})