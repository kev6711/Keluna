import mongoose from "mongoose";
import User from "../models/user.model.js";
import { calculateNutritionGoals } from "../services/nutrition.service.js";
import { createNutritionGoal } from "../services/nutritionGoal.service.js";

export const createProfile = async (req, res) => {
    try {
        const { gender, birthDate, height, weight, activityLevel, objectiveType } = req.body;
        if (!gender || !birthDate || height === undefined || weight === undefined || !activityLevel || !objectiveType) {
            return res.status(400).json({
                message: "Tous les champs du profil sont obligatoires.",
            });
        }

        const allowedGenders = ["male", "female"];
        if (!allowedGenders.includes(gender)) {
            return res.status(400).json({
                message: "Le sexe sélectionné n'est pas valide.",
            });
        }

        const parsedBirthDate = new Date(birthDate);
        if (Number.isNaN(parsedBirthDate.getTime())) {
            return res.status(400).json({
                message: "La date de naissance n'est pas valide.",
            });
        }

        const today = new Date();
        let age = today.getFullYear() - parsedBirthDate.getFullYear();
        const monthDifference = today.getMonth() - parsedBirthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < parsedBirthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            return res.status(400).json({
                message: "Vous devez avoir au moins 18 ans pour utiliser Keluna.",
            });
        }

        if (typeof height !== "number" || height < 100 || height > 250) {
            return res.status(400).json({
                message: "La taille doit être comprise entre 100 et 250 cm.",
            });
        }

        if (typeof weight !== "number" || weight < 30 || weight > 300) {
            return res.status(400).json({
                message: "Le poids doit être compris entre 30 et 300 kg.",
            });
        }

        const allowedActivityLevels = ["sedentary", "light", "moderate", "active", "very_active"];
        if (!allowedActivityLevels.includes(activityLevel)) {
            return res.status(400).json({
                message: "Le niveau d'activité sélectionné n'est pas valide.",
            });
        }

        const allowedObjectiveTypes = ["maintenance", "weight_loss", "weight_gain"];
        if (!allowedObjectiveTypes.includes(objectiveType)) {
            return res.status(400).json({
                message: "L'objectif sélectionné n'est pas valide.",
            });
        }

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable.",
            });
        }

        if (user.profile) {
            return res.status(409).json({
                message: "Le profil utilisateur existe déjà.",
            });
        }

        const session = await mongoose.startSession();
        let nutritionGoals;

        try {
            await session.withTransaction(async () => {
                user.profile = {
                    gender,
                    birthDate,
                    height,
                    weight,
                    activityLevel,
                    objectiveType,
                };

                nutritionGoals = calculateNutritionGoals(user.profile);

                await user.save({ session });

                await createNutritionGoal({
                    userId: user._id,
                    nutritionGoals,
                    session,
                });
            });
        } finally {
            await session.endSession();
        }

        return res.status(201).json({
            message: "Profil créé avec succès.",
            profile: user.profile,
            nutritionGoals,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Une erreur est survenue lors de la création du profil.",
        });
    }
};
