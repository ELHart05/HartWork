const workoutModel = require("../models/workoutModel.js")
const { isValidObjectId } = require("mongoose")

const getAllWorkouts = (req, res) => {
    const owner = req.user._id;
    workoutModel.find({owner}).sort({createdAt: -1})
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.status(400).send({err: err.message})
    })
}

const getAWorkout = (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        res.status(404).send({err: "no such workouts"})
        return;
    }
    workoutModel.findById(id)
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.status(400).send({err: err.message})
    })
}

const postWorkout = (req, res) => {
    const { title, reps, load } = req.body;
    const owner = req.user._id;

    if (req.body.length = 0){
        res.status(404).send({err: "no details detected"})
        return;
    }
    const newWorkout = new workoutModel({ title, reps, load, owner });
    newWorkout.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.status(400).send({err: err.message})
    })
}

const patchWorkout = (req, res) => {
    const { id } = req.params;
    const { title, reps, load } = req.body;
    if (!isValidObjectId(id)) {
        res.status(404).send({err: "no such workouts"})
        return;
    }
    if (!req.body.length){
        res.status(404).send({err: "no details detected"})
        return;
    }
    workoutModel.findByIdAndUpdate(id, {title, reps, load})
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.status(400).send({err: err.message})
    })
}

const deleteWorkout = (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        res.status(404).send({err: "no such workouts"})
        return;
    }
    workoutModel.findByIdAndRemove(id)
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.status(400).send({err: err.message})
    })
}

module.exports = {
    getAllWorkouts,
    getAWorkout,
    postWorkout,
    patchWorkout,
    deleteWorkout
}