const db = require('../models');
const Record = db.adoption_records;

const validateRequest =
    require('../helpers/validate_request').validateRequest();
const savedbData = require('../helpers/save_db_data').savedbData();

// Create adoption record
exports.create = (req, res) => {
    validateRequest(
        !req.body.adoption_id && !req.body.animalId && !req.body.householdId
    );

    const record = new Record({
        adoption_id: req.body.adoption_id,
        animal_id: req.body.animal_id,
        household_id: req.body.household_id,
        adoption_complete: req.body.adoption_complete,
        adoption_date: req.body.adoption_date,
    });

    savedbData(res, record, 'Adoption Record');
};
