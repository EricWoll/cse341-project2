const db = require('../models');
const Animal = db.animals;

const validateRequest =
    require('../helpers/validate_request').validateRequest();
const savedbData = require('../helpers/save_db_data').savedbData();

// Create animal
exports.create = (req, res) => {
    validateRequest(!req.body.name && !req.body.animal_id);

    const animal = new Animal({
        animal_id: req.body.animal_id,
        name: req.body.name,
        type: req.body.type,
        size: req.body.size,
        weight: req.body.weight,
        has_chip: req.body.has_chip,
        medications: req.body.medications,
    });

    savedbData(res, animal, 'Animal');
};
