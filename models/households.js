module.exports = (mongoose) => {
    const household = mongoose.model(
        'household',
        mongoose.Schema(
            {
                household_id: String,
                last_name: String,
                people_amount: Number,
                current_pets: Array,
                paperwork_complete: Boolean,
            },
            { timestamps: true }
        )
    );
    return household;
};
