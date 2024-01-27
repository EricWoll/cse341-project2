exports.savedbData = (res, data, dataName) => {
    data.save(data)
        .then((info) => {
            res.send(info);
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    `Some error occurred while creating a(n) ${dataName}.`,
            });
        });
};
