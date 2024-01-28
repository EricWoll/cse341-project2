const db = require('../models');
const Household = db.households;

exports.create = (req, res) => {
    /*
        #swagger.summary = 'Creates a Household Record'
        #swagger.tags=['Household Records']
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/householdRecord' }
        }
        #swagger.responses[400] = {
            schema: { message: `Content can not be empty!`}
        }
        #swagger.responses[500] = {
            schema: { message: `Some error occurred while creating an Household Record for id of [household_id].`}
        }
    */
    if (!req.body.household_id && !req.body.last_name) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }

    const house = new Household({
        household_id: req.body.household_id,
        last_name: req.body.last_name,
        people_amount: req.body.people_amount,
        current_pets: req.body.current_pets,
        paperwork_complete: req.body.paperwork_complete,
    });

    house
        .save(house)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Error creating an Household Record.`,
                });
            } else {
                res.status(204).send();
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Some error occurred while creating a Household for id of ${house.household_id}.`,
            });
        });
};

exports.findAll = (req, res) => {
    /*
        #swagger.summary = 'Gets all Household Records'
        #swagger.tags=['Household Records']
        #swagger.responses[200] = {
            schema: [ { $ref: '#/definitions/householdRecord'} ]
        }
        #swagger.responses[404] = {
            schema: { message: 'No Household Records found.' }
        }
        #swagger.responses[500] = {
            schema: { message: `Some error occured while retrieving Household Records.`}
        }
    */
    Household.find(
        {},
        {
            household_id: 1,
            last_name: 1,
            people_amount: 1,
            current_pets: 1,
            paperwork_complete: 1,
            _id: 0,
        }
    )
        .then((data) => {
            if (!data.length) {
                res.status(404).send({
                    message: 'No Household Records found.',
                });
            } else {
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    'Some error occured while retrieving Household Records.',
            });
        });
};

exports.findOne = (req, res) => {
    /*
        #swagger.summary = 'Gets a Household Record'
        #swagger.tags=['Household Records']
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/householdRecord'}
        }
        #swagger.responses[404] = {
            schema: { message: `No Household Record found for id of [household_id].`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error retrieving Household Record with id of [household_id].`}
        }
    */
    const household_id = req.params.household_id;
    Household.find({ household_id: household_id })
        .then((data) => {
            if (!data.length) {
                res.status(404).send({ message: 'No Household Record found.' });
            } else {
                res.send(data[0]);
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Error retrieving Household Record with id of ${household_id}.`,
            });
        });
};

exports.findAllComplete = (req, res) => {
    /*
        #swagger.summary = 'Gets all "complete" Household Records'
        #swagger.tags=['Household Records']
        #swagger.responses[200] = {
            schema: [ { $ref: '#/definitions/householdRecord'} ]
        }
        #swagger.responses[404] = {
            schema: { message: `No Household 'paperwork complete' Records found.`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error retrieving Household 'completed paperwork' Records.`}
        }
    */
    Household.find({ paperwork_complete: true })
        .then((data) => {
            if (!data.length) {
                res.status(404).send({
                    message: 'No Household "paperwork complete" Records found.',
                });
            } else {
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    'Error retrieving Household "completed paperwork" Records.',
            });
        });
};

exports.findAllIncomplete = (req, res) => {
    /*
        #swagger.summary = 'Gets all "incomplete" Household Records'
        #swagger.tags=['Household Records']
        #swagger.responses[200] = {
            schema: [ { $ref: '#/definitions/householdRecord'} ]
        }
        #swagger.responses[404] = {
            schema: { message: `No Household 'paperwork incomplete' Records found.`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error retrieving Household 'incomplete paperwork' Records.`}
        }
    */
    Household.find({ paperwork_complete: false })
        .then((data) => {
            if (!data.length) {
                res.status(404).send({
                    message:
                        'No Household "paperwork incomplete" Records found.',
                });
            } else {
                res.send(data);
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    'Error retrieving Household "incomplete paperwork" Records.',
            });
        });
};

exports.update = (req, res) => {
    /*
        #swagger.summary = 'Updates a Household Record'
        #swagger.tags=['Household Records']
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/householdRecord' }
        }
        #swagger.responses[400] = {
            schema: { message: 'Updated data cannot be empty!' }
        }
        #swagger.responses[404] = {
            schema: { message: `No Household Record found for id of [household_id].`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error updating Household Record with id of [household_id].`}
        }
    */
    if (!req.body) {
        return res
            .status(400)
            .send({ message: 'Updated data cannot be empty!' });
    }

    const house = {
        household_id: req.body.household_id,
        last_name: req.body.last_name,
        people_amount: req.body.people_amount,
        current_pets: req.body.current_pets,
        paperwork_complete: req.body.paperwork_complete,
    };

    Household.findOneAndUpdate({ household_id: house.household_id }, house)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `No Household paperwork Record found.`,
                });
            } else {
                res.status(204).send();
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Error updating Household paperwork Record with id of ${house.household_id}.`,
            });
        });
};

exports.delete = (req, res) => {
    /*
        #swagger.summary = 'Deletes a Household Record'
        #swagger.tags=['Household Records']
        #swagger.responses[200] = {
            schema: { message: `Household Record deleted successfully.`}
        }
        #swagger.responses[404] = {
            schema: { message: `No Household Record found for id of [household_id].`}
        }
        #swagger.responses[500] = {
            schema: { message: `Error deleting Household Record with id of [household_id].`}
        }
    */
    const household_id = req.params.household_id;
    Household.findOneAndDelete({ household_id: household_id })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `No Household paperwork Record found.`,
                });
            } else {
                res.status(204).send();
            }
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Error deleting Household Record with id of ${household_id}.`,
            });
        });
};
