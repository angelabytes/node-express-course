const people = require('../data');

const addPerson = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({success: false, message: "Please provide a name:"});
    }
    people.push({id: people.length + 1, name: name });
    res.status(201).json({success: true, person: name});
}

const getPeople = (req, res) => {
    const allPersons = people.map((person) =>{
            const { id, name } = person;
            return { id, name };
        });
        res.json(allPersons);
}

const getPerson = (req, res) => {
    const idToFind = parseInt(req.params.id);
        const onePerson = people.find((person) => person.id === idToFind);
      
        if(!onePerson){
            return res.status(404).json({success: false, message: `Could not find a person with an id of ${idToFind}.`});
        }
     
        console.log(onePerson);
        return res.status(200).json({success: true, data: onePerson});
}

module.exports = {
    addPerson,
    getPeople,
    getPerson
};