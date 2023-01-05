const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
}, { timestamps: true })

const workoutModel = mongoose.model('workouts', workoutSchema);

module.exports = workoutModel;