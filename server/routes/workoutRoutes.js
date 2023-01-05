const { Router } = require("express");
const { getAllWorkouts, getAWorkout, postWorkout, patchWorkout, deleteWorkout } = require("../controllers/workoutController.js");
const requireAuth = require('../middleware/requireAuth.js');

const router = Router();

//require auth for all routes
router.use(requireAuth)

router.get('/', getAllWorkouts)

router.get('/:id', getAWorkout)

router.post('/', postWorkout)

router.patch('/:id', patchWorkout)

router.delete('/:id', deleteWorkout)

module.exports = router;