const validator = require('./validate.setup');
const saveAdoptionRecord = async (req, res, next) => {
    const validationRule = {
        adoption_id: 'required|string',
        animal_id: 'required|string',
        household_id: 'required|string',
        adoption_complete: 'required|boolean',
        adoption_date: 'required|string',
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
    saveAdoptionRecord,
};
