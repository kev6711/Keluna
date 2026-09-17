import mongoose from "mongoose";

const nutritionGoalSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        bmr: {
            type: Number,
            required: true,
        },

        tdee: {
            type: Number,
            required: true,
        },

        calorieTarget: {
            type: Number,
            required: true,
        },

        protein: {
            type: Number,
            required: true,
        },

        carbs: {
            type: Number,
            required: true,
        },

        fat: {
            type: Number,
            required: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

nutritionGoalSchema.index(
    {
        user: 1,
    },
    {
        unique: true,
        partialFilterExpression: {
            isActive: true,
        },
    },
);

const NutritionGoal = mongoose.model("NutritionGoal", nutritionGoalSchema);

export default NutritionGoal;
