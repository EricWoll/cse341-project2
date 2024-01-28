const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Adoption API',
        description: 'Holds Household, Animal, and Adoption records',
    },
    host: 'https://cse341-project2-dipb.onrender.com',
    schemes: ['https', 'http'],
    definitions: {
        adoptionRecord: {
            adoption_id: '65146',
            animal_id: '58589',
            household_id: '32321',
            adoption_complete: false,
            adoption_date: '10/22/2024',
        },
        animalRecord: {
            animal_id: '65487',
            name: 'some name',
            type: 'some type',
            size: 'some height',
            weight: 'some weight',
            has_chip: false,
            medications: ['some medication'],
        },
        householdRecord: {
            household_id: '54654',
            last_name: 'some name',
            people_amount: 4,
            current_pets: ['some animal'],
            paperwork_complete: false,
        },
    },
};

const outputFile = './swagger-output.json';
const routes = ['../routes/index.js'];

swaggerAutogen(outputFile, routes, doc);
