// Instantiate router - DO NOT MODIFY
const express = require('express');
const router = express.Router();

/**
 * INTERMEDIATE BONUS PHASE 2 (OPTIONAL) - Code routes for the insects
 *   by mirroring the functionality of the trees
 */
// Your code here
const {Insect} = require('../db/models');
const {Op} = require('sequelize')

router.get('/search/:value', async (req, res, next) => {
    let insects = [];
    insects = await Insect.findAll({
        where: {
            name: {
                [Op.like]: `%${req.params.value}%`
            }
        }
    })

    res.json(insects);
});

router.get('/:insectId', async (req, res, next) => {
    try {
        const insect = await Insect.findByPk(req.params.insectId);
        if(insect) {
            res.json(insect)
        } else {
            throw new Error('Insect not found')
        }
    } catch (err) {
        next(err);
    }
})

router.delete('/:insectId', async (req, res, next) => {
    try {
        const insect = await Insect.findByPk(req.params.insectId);

        if(!insect) {
            throw new Error('Insect not found');
        }
        await insect.destroy()

        res.json({
            status: "success",
            message: `Successfully removed insect ${req.params.insectId}`
        })
    } catch (err) {
        next(err)
    }
})

router.put('/:insectId', async (req, res, next) => {
    try {
        // Your code here
        const updatedInsect = await Insect.findByPk(req.params.insectId);
        if (!updatedInsect) {
            const err = new Error();
            err.status = 'not-found';
            err.message = `Could not update insect ${req.params.insectId}`
            err.details =  'Insect not found';
            next(err);
        }

        const {id, name, description, fact, territory, millimeters} = req.body;

        if(id != updatedInsect.id) {
            const err = new Error();
            err.status = 'error';
            err.message = `Could not update insect`
            err.details =  `${req.params.id} does not match ${id}`;
            return next(err);
        }

        if (name) {
            updatedInsect.name = name;
        }

        if(description) {
            updatedInsect.description = description;
        }

        if(fact) {
            updatedInsect.fact = fact;
        }
        
        if (territory) {
            updatedInsect.territory = territory;
        }

        if( millimeters) {
            updatedInsect.millimeters = millimeters;
        }

        await updatedInsect.save();

        res.json({
            status: "success",
            message: "Successfully updated tree",
            data: updatedInsect
        })

    } catch(err) {
        next({
            status: "error",
            message: 'Could not update Insect',
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {name, description, fact, territory, millimeters} = req.body;
        const newInsect = await Insect.create({
            name: name,
            description: description,
            fact: fact,
            territory: territory,
            millimeters: millimeters
        });

        res.json({
            status: "success",
            message: "Successfully created new Insect",
            data: newInsect
        });

    } catch(err) {
        next({
            status: "error",
            message: 'Could not create new tree',
            details: err.errors ? err.errors.map(item => item.message).join(', ') : err.message
        });
    }
})

router.get('/', async (req, res, next) => {
    const insects = await Insect.findAll({
        attributes: ['id','name','millimeters'],
        order: ['millimeters']
    })

    res.json(insects)
})

// Export class - DO NOT MODIFY
module.exports = router;