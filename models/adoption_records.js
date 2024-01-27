module.exports = (mongoose) => {
    const adoption_record = mongoose.model(
        'adoption_record',
        mongoose.Schema(
            {
                adoption_id: String,
                animal_id: String,
                household_id: String,
                adoption_complete: Boolean,
                adoption_date: Date,
            },
            { timestamps: true }
        )
    );
    return adoption_record;
};
