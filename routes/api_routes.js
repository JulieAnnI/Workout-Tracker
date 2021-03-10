const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");

//Update Workout 
router.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { exercise: req.body } },
        { new: true }
    ).then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.json(err);
    });
});


//Get all workouts
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([{
        $addFields:{
            totalDuration: {$sum:"$exercises.duration"}
        }
    }])
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.json(err);
    });
});

//Get all workouts within a range
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([{
        $addFields:{
            totalDuration: {$sum:"$exercises.duration"}
        }
    }])
    .sort( {day: "desc" })
    .limit(7)
    .sort( {day: "asc" })
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.json(err);
    });
});



module.exports = router;