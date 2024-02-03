const validator = require('./validate.setup');
const saveHouseholdRecord = async (req, res, next) => {
    const validationRule = {
        household_id: 'required|string',
        last_name: 'required|string',
        people_amount: 'required|integer',
        current_pets: 'array',
        paperwork_complete: 'required|boolean',
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err,
            });
        } else {
            next();
        }
    }).catch((err) => console.log(err));
};
module.exports = {
    saveHouseholdRecord,
};
