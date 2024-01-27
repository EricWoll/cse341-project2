const db = require('../models');
const Household = db.households;

const validateRequest =
    require('../helpers/validate_request').validateRequest();
const savedbData = require('../helpers/save_db_data').savedbData();

exports.create = (req, res) => {
    validateRequest(!req.body.household_id && !req.body.last_name);

    const house = new Household({
        household_id: req.body.household_id,
        last_name: req.body.last_name,
        people_amount: req.body.people_amount,
        current_pets: req.body.current_pets,
        paperwork_complete: req.body.paperwork_complete,
    });

    savedbData(res, house, 'Household');
};
