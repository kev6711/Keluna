import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        gender: {
            type: String,
            required: true,
            enum: ["male", "female"],
        },

        birthDate: {
            type: Date,
            required: true,
        },

        height: {
            type: Number,
            required: true,
            min: 100,
            max: 250,
        },

        weight: {
            type: Number,
            required: true,
            min: 30,
            max: 300,
        },

        activityLevel: {
            type: String,
            required: true,
            enum: ["sedentary", "light", "moderate", "active", "very_active"],
        },

        objectiveType: {
            type: String,
            required: true,
            enum: ["maintenance", "weight_loss", "weight_gain"],
        },
    },
    {
        _id: false,
    },
);

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "L'adresse email n'est pas valide."],
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
        },

        profile: {
            type: profileSchema,
            required: false,
        },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model("User", userSchema);

export default User;
