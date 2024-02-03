const db = require('../models');
const Record = db.adoption_records;

// Create adoption record
exports.create = (req, res) => {
    /*
        #swagger.summary = 'Creates an Adoption Record'
        #swagger.tags=['Adoption Records']
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/adoptionRecord' }
        }
        #swagger.responses[400] = {
            schema: { message: `Content can not be empty!` }
        }
        #swagger.responses[401] = {
            schema: {$ref: '#/definitions/notAuthed' }
        }
        #swagger.responses[500] = {
            schema: { message: `Some error occurred while creating an Adopotion Record for id of [adoption_id].`}
        }
    */
    if (!req.body.adoption_id && !req.body.animalId && !req.body.householdId) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    const record = new Record({
        adoption_id: req.body.adoption_id,
        animal_id: req.body.animal_id,
        household_id: req.body.household_id,
        adoption_complete: req.body.adoption_complete,
        adoption_date: req.body.adoption_date,
    });

    record
        .save(record)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Error creating an Adoption Record.`,
                });
            } else {
                res.status(204).send();
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Some error occurred while creating an Adopotion Record for id of ${record.adoption_id}.`,
            });
        });
};

exports.findAll = (req, res) => {
    /*
        #swagger.summary = 'Gets all Adoption Records'
        #swagger.tags=['Adoption Records']
        #swagger.responses[200] = {
            schema: [{ $ref: '#/definitions/adoptionRecord'}]
        }
        #swagger.responses[404] = {
            schema: { message: 'No Adoption Records found.' }
        }
        #swagger.responses[500] = {
            schema: { message: `Some error occured while retrieving Adoption Records.`}
        }
    */
    Record.find(
        {},
        {
            adoption_id: 1,
            animal_id: 1,
            household_id: 1,
            adoption_complete: 1,
            adoption_date: 1,
            _id: 0,
        }
    )
        .then((data) => {
            if (!data.length) {
                res.status(404).send({
                    message: 'No Adoption Records found.',
                });
            } else {
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occured while retrieving Adoption Records.',
            });
        });
};

exports.findOne = (req, res) => {
    /*
        #swagger.summary = 'Gets an Adoption Record'
        #swagger.tags=['Adoption Records']
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/adoptionRecord'}
        }
        #swagger.responses[404] = {
            schema: { message: `No Adoption Record found for id of [adoption_id].`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error retrieving Adoption Record with id of [adoption_id].`}
        }
    */
    const adoption_id = req.params.adoption_id;
    Record.find({ adoption_id: adoption_id })
        .then((data) => {
            if (!data.length) {
                res.status(404).send({
                    message: `No Adoption Record found for id of ${adoption_id}.`,
                });
            } else {
                res.send(data[0]);
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Error retrieving Adoption Record with id of ${adoption_id}.`,
            });
        });
};

exports.findAllComplete = (req, res) => {
    /*
        #swagger.summary = `Gets all 'complete' Adoption Records`
        #swagger.tags=['Adoption Records']
        #swagger.responses[200] = {
            schema: [{ $ref: '#/definitions/adoptionRecord'}]
        }
        #swagger.responses[404] = {
            schema: { message: `No 'completed' Adoption Records found.`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error retrieving 'completed' Adoption Records.`}
        }
    */
    Record.find({ adoption_complete: true })
        .then((data) => {
            if (!data.length) {
                res.status(404).send({
                    message: 'No "Completed" Adoption Records found.',
                });
            } else {
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Error retrieving "completed" Adoption Records.`,
            });
        });
};

exports.findAllIncomplete = (req, res) => {
    /*
        #swagger.summary = `Gets all 'incomplete' Adoption Records`
        #swagger.tags=['Adoption Records']
        #swagger.responses[200] = {
            schema: [{ $ref: '#/definitions/adoptionRecord'}]
        }
        #swagger.responses[404] = {
            schema: { message: `No 'incompleted' Adoption Record found.`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error retrieving 'incompleted' Adoption Records.`}
        }
    */
    Record.find({ adoption_complete: false })
        .then((data) => {
            if (!data.length) {
                res.status(404).send({
                    message: 'No "Incompleted" Adoption Record found.',
                });
            } else {
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Error retrieving "incomplete" Adoption Records.`,
            });
        });
};

exports.findAnimal = (req, res) => {
    /*
        #swagger.summary = 'Gets Adoption Record from animal_id'
        #swagger.tags=['Adoption Records']
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/adoptionRecord'}
        }
        #swagger.responses[404] = {
            schema: { message: `No Animal Record found for id of [animal_id].`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error retrieving Animal Adoption Record for id of [animal_id].`}
        }
    */
    const animal_id = req.params.animal_id;
    Record.find({ animal_id: animal_id })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `No Animal Record found for id of ${animal_id}.`,
                });
            } else {
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Error retrieving Animal Adoption Record for id of ${animal_id}.`,
            });
        });
};

exports.findHousehold = (req, res) => {
    /*
        #swagger.summary = 'Gets Adoption Record from household_id'
        #swagger.tags=['Adoption Records']
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/adoptionRecord'}
        }
        #swagger.responses[404] = {
            schema: { message: `No Household Record found for id of [household_id].`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error retrieving Household Adoption Record for id of [household_id].`}
        }
    */
    const household_id = req.params.household_id;
    Record.find({ household_id: household_id })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `No Household Record found for id of ${household_id}.`,
                });
            } else {
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Error retrieving Household Adoption Record for id of ${household_id}.`,
            });
        });
};

exports.update = (req, res) => {
    /*
        #swagger.summary = 'Updates an Adoption Record'
        #swagger.tags=['Adoption Records']
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {$ref: '#/definitions/adoptionRecord'}
        }
        #swagger.responses[400] = {
            schema: { message: 'Updated data cannot be empty!' }
        }
        #swagger.responses[401] = {
            schema: {$ref: '#/definitions/notAuthed'}
        }
        #swagger.responses[404] = {
            schema: { message: `No Adoption Record found for id of [adoption_id].`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error updating Adoption Record with id of [adoption_id].`}
        }
    */
    if (!req.body) {
        return res
            .status(400)
            .send({ message: 'Updated data cannot be empty!' });
    }

    const record = {
        adoption_id: req.body.adoption_id,
        animal_id: req.body.animal_id,
        household_id: req.body.household_id,
        adoption_complete: req.body.adoption_complete,
        adoption_date: req.body.adoption_date,
    };
    Record.findOneAndUpdate({ adoption_id: record.adoption_id }, record)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `No Adoption Record found for id of ${record.adoption_id}.`,
                });
            } else {
                res.status(204).send();
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Error updating Adoption Record with id of ${record.adoption_id}.`,
            });
        });
};

exports.delete = (req, res) => {
    /*
        #swagger.summary = 'Deletes an Adoption Record'
        #swagger.tags=['Adoption Records']
        #swagger.responses[401] = {
            schema: {$ref: '#/definitions/notAuthed' }
        }
        #swagger.responses[404] = {
            schema: { message: `No Adoption Record found for id of [adoption_id].`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error deleting Adoption Record with id of [adoption_id].`}
        }
    */
    const adoption_id = req.params.adoption_id;
    Record.findOneAndDelete({ adoption_id: adoption_id })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `No Adoption Record found for id of ${adoption_id}.`,
                });
            } else {
                res.status(204).send();
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Error deleting Adoption Record with id of ${adoption_id}.`,
            });
        });
};
