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


// STEP 1: Update a puppy by id
app.put('/puppies/:puppyId', async (req, res, next) => {
    // Your code here
    const updatedPuppy = await Puppy.findByPk(req.params.puppyId);
    if (!updatedPuppy){
        throw new Error('Puppy not found');
    }

    const {age_yrs, weight_lbs, microchipped} = req.body;
    if(age_yrs) {
        updatedPuppy.set({age_yrs: age_yrs})
    }

    if(weight_lbs) {
        updatedPuppy.set({weight_lbs: weight_lbs})
    }

    if(microchipped) {
        updatedPuppy.set({microchipped: microchipped})
    }

    await updatedPuppy.save();

    res.json({
        message: 'Puppy successfully updated',
        puppy: updatedPuppy
    })
})


// STEP 2: Delete a puppy by id
app.delete('/puppies/:puppyId', async (req, res, next) => {
    // Your code here
    const deletedPuppy = await Puppy.findByPk(req.params.puppyId);

    if(!deletedPuppy) {
        throw new Error('Puppy not found');
    }

    await deletedPuppy.destroy();

    res.json({
        message: "The puppy with the specified id has been deleted",
        puppy: deletedPuppy
    })
})


// Root route - DO NOT MODIFY
app.get('/', (req, res) => {
    res.json({
        message: "API server is running"
    });
});

// Set port and listen for incoming requests - DO NOT MODIFY
if (require.main === module) {
    const port = 8000;
    app.listen(port, () => console.log('Server is listening on port', port));
} else {
    module.exports = app;
}