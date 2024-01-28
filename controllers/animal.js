const db = require('../models');
const Animal = db.animals;

// Create animal
exports.create = (req, res) => {
    /*
        #swagger.summary = 'Creates an Animal Record'
        #swagger.tags=['Animal Records']
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/animalRecord' }
        }
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/animalRecord'}
        }
        #swagger.responses[400] = {
            schema: { message: `Content can not be empty!`}
        }
        #swagger.responses[500] = {
            schema: { message: `Some error occurred while creating an Animal Record for id of [animal_id].`}
        }
    */
    if (!req.body.name && !req.body.animal_id) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    const animal = new Animal({
        animal_id: req.body.animal_id,
        name: req.body.name,
        type: req.body.type,
        size: req.body.size,
        weight: req.body.weight,
        has_chip: req.body.has_chip,
        medications: req.body.medications,
    });

    animal
        .save(animal)
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Some error occurred while creating an Animal Record for id of ${animal.animal_id}.`,
            });
        });
};

exports.findAll = (req, res) => {
    /*
        #swagger.summary = 'Gets all Animal Records'
        #swagger.tags=['Animal Records']
        #swagger.responses[200] = {
            schema: [{ $ref: '#/definitions/animalRecord'}]
        }
        #swagger.responses[404] = {
            schema: { message: 'No Animal Records found.' }
        }
        #swagger.responses[500] = {
            schema: { message: `Some error occured while retrieving Animal Records.`}
        }
    */
    Animal.find(
        {},
        {
            animal_id: 1,
            name: 1,
            type: 1,
            size: 1,
            weight: 1,
            has_chip: 1,
            medications: 1,
            _id: 0,
        }
    )
        .then((data) => {
            if (!data.length) {
                res.status(404).send({
                    message: 'No Animal Records found.',
                });
            } else {
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occured while retrieving Animal records.',
            });
        });
};

exports.findOne = (req, res) => {
    /*
        #swagger.summary = 'Gets an Animal Record'
        #swagger.tags=['Animal Records']
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/animalRecord'}
        }
        #swagger.responses[404] = {
            schema: { message: `No Animal Record found for id of [animal_id].`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error retrieving Animal Record with id of [animal_id].`}
        }
    */
    const animal_id = req.params.animal_id;
    Animal.find({ animal_id: animal_id })
        .then((data) => {
            if (!data.length) {
                res.status(404).send({
                    message: `No Animal Record found with id of ${animal_id}.`,
                });
            } else {
                res.send(data[0]);
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Error retrieving Animal Record with id of ${animal_id}.`,
            });
        });
};

exports.update = (req, res) => {
    /*
        #swagger.summary = 'Updates an Animal Record'
        #swagger.tags=['Animal Records']
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/animalRecord'}
        }
        #swagger.responses[200] = {
            schema: { message: `Animal Record updated successfully.`}
        }
        #swagger.responses[400] = {
            schema: { message: 'Updated data cannot be empty!' }
        }
        #swagger.responses[404] = {
            schema: { message: `No Animal Record found for id of [animal_id].`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error updating Animal Record with id of [animal_id].`}
        }
    */
    if (!req.body) {
        return res
            .status(400)
            .send({ message: 'Updated data cannot be empty!' });
    }

    const animal = {
        animal_id: req.body.animal_id,
        name: req.body.name,
        type: req.body.type,
        size: req.body.size,
        weight: req.body.weight,
        has_chip: req.body.has_chip,
        medications: req.body.medications,
    };

    Animal.findOneAndUpdate({ animal_id: animal.animal_id }, animal)
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: `No Animal Record found.` });
            } else {
                res.send({ message: `Animal Record updated successfully.` });
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Error updating Animal Record with id of ${animal.animal_id}.`,
            });
        });
};

exports.delete = (req, res) => {
    /*
        #swagger.summary = 'Deletes an Animal Record'
        #swagger.tags=['Animal Records']
        #swagger.responses[200] = {
            schema: { message: `Animal Record deleted successfully.`}
        }
        #swagger.responses[404] = {
            schema: { message: `No Animal Record found for id of [animal_id].`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error deleting Animal Record with id of [animal_id].`}
        }
    */
    const animal_id = req.params.animal_id;
    Animal.findOneAndDelete({ animal_id: animal_id })
        .then((data) => {
            if (!data) {
                res.status(404).send({ message: `No Animal Record found.` });
            } else {
                res.send({ message: `Animal Record deleted successfully.` });
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Error deleting Animal Record with id of ${animal_id}.`,
            });
        });
};
