const validator = require('./validate.setup');
const saveAnimalRecord = async (req, res, next) => {
    const validationRule = {
        animal_id: 'required|string',
        name: 'required|string',
        type: 'required|string',
        size: 'string',
        weight: 'string',
        has_chip: 'required|boolean',
        medications: 'array',
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
    saveAnimalRecord,
};
