exports.validateRequest = (booleanToCheck) => {
    if (booleanToCheck) {
        res.status(400).send({ message: 'Content can not be empty!' });
        return;
    }
};
