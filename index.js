const express = require('express');
const cors = require('cors');

const api = express();
const db = require('./models');

api.use(cors());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(
        process.stderr.fd,
        `Caught exception: ${err}\nException origin: ${origin}`
    );
});

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to databse...');
    })
    .catch((error) => {
        console.log('Cannot connect to Database...', error);
        process.exit();
    });

const PORT = process.env.PORT || 3000;
api.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
