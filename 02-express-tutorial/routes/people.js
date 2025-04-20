const express = require('express');
const router = express.Router();
const {
    addPerson,
    getPeople,
    getPerson
} = require('../controllers/people')
const{ people } = require('../data');


/**
 * Tests gets and posts with router before adding to the controller.
 * Routes for all people, finding a person by id and adding a person.
 */
router.get('/', (req, res) => {
    const allPersons = people.map((person) => {
        const { id, name } = person;
        return { id, name };
    });
    res.status(200).json({success: true, data: allPersons});
});

router.post('/', (req, res) => {
    if(!req.body.name){
        res.status(400).json({ success: false, message: "Please provide a name" });
    }
    people.push({id: people.length + 1, name: req.body.name });
    res.status(201).json({ success: true, name: req.body.name });
});

router.get('/:id', (req, res) => {
    const idToFind = parseInt(req.params.id);
    const onePerson = people.find((person) => person.id === idToFind);
      
    if (!onePerson) {
        return res.status(404).json({success: false, message: `Could not find a person with an id of ${idToFind}.`});
    }
    
    console.log(onePerson);
    return res.status(200).json({success: true, data: onePerson});
});

router.put('/:id', (req, res) => {
    const idToFind = parseInt(req.params.id);
    const  { name } = req.body;

    const onePerson = people.find((person) => person.id === idToFind);

    if (!onePerson) {
        return res.status(404).json({success: false, message: `Could not find a person with an id of ${idToFind}.`});
    }
    const newPerson = people.map((person) => {
        if (person.id === idToFind) {
            person.name = name;
        }
        return person;
    });

    return res.status(200).json({success: true, data: newPerson});
});

router.delete('/:id', (req, res) => {
    const idToFind = parseInt(req.params.id);

    const onePerson = people.find((person) => person.id === idToFind);

    if (!onePerson) {
        return res.status(404).json({success: false, message: `Could not find a person with an id of ${idToFind}.`});
    }

    const remainingPeople = people.filter((person) => person.id !== idToFind);
    people = remainingPeople;

    return res.status(200).json({success: true, data: people});
});


module.exports = router;