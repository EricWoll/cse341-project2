module.exports = (mongoose) => {
    const animal = mongoose.model(
        'animal',
        mongoose.Schema(
            {
                animal_id: String,
                name: String,
                type: String,
                size: String,
                weight: String,
                has_chip: Boolean,
                medications: Array,
            },
            { timestamps: true }
        )
    );
    return animal;
};
