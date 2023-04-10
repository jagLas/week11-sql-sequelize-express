// Instantiate Express and the application - DO NOT MODIFY
const express = require('express');
const app = express();

// Error handling, env variables, and json middleware - DO NOT MODIFY
require('express-async-errors');
require('dotenv').config();
app.use(express.json());

// Import the models used in these routes - DO NOT MODIFY
const { Puppy } = require('./db/models');

// Index of all puppies - DO NOT MODIFY
app.get('/puppies', async (req, res, next) => {
    const allPuppies = await Puppy.findAll({order: [['name', 'ASC']]});

    res.json(allPuppies);
});


// STEP 1
// Capture the name, age_yrs, breed, weight_lbs, and microchipped attributes
// from the body of the request.
// Use these values to BUILD a new Puppy in the database.
// Respond to the request by sending a success message
app.post('/puppies/build', async (req, res, next) => {
    // Your code here
    try{
        const newPuppy = await Puppy.build({
            name: req.body.name,
            age_yrs: req.body.age_yrs,
            breed: req.body.breed,
            weight_lbs: req.body.weight_lbs,
            microchipped: req.body.microchipped
        });

        await newPuppy.save();

        res.json({
            message: "Recorded successfully saved",
            data: newPuppy
        })
    } catch(err) {
        next(err);
    }
})

// STEP 2
// Capture the name, age_yrs, breed, weight_lbs, and microchipped attributes
// from the body of the request.
// Use these values to CREATE a new Puppy in the database.
// Respond to the request by sending a success message
app.post('/puppies/create', async (req, res, next) => {
    // Your code here
    try{
        const newPuppy = await Puppy.create({
            name: req.body.name,
            age_yrs: req.body.age_yrs,
            breed: req.body.breed,
            weight_lbs: req.body.weight_lbs,
            microchipped: req.body.microchipped
        });

        res.json({
            message: "Recorded successfully saved",
            data: newPuppy
        })
    } catch(err) {
        next(err);
    }
})


// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
if (require.main === module) {
    const port = 5000;
    app.listen(port, () => console.log('Server is listening on port', port));
} else {
    module.exports = app;
}