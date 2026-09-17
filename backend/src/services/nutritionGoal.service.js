import NutritionGoal from "../models/nutritionGoal.model.js";

// Session pour faire en sorte que s'il y a une erreur lors de createdNutritionGoals alors toute l'opération est annulée (utilisateur ne se retrouve pas sans nutritionGoal)
export const createNutritionGoal = async ({ userId, nutritionGoals, session }) => {
    await NutritionGoal.updateMany(
        {
            user: userId,
            isActive: true,
        },
        {
            $set: {
                isActive: false,
            },
        },
        {
            session,
        },
    );

    // TEST TEMPORAIRE DU ROLLBACK
    throw new Error("Test volontaire de la transaction");

    const createdNutritionGoals = await NutritionGoal.create(
        [
            {
                user: userId,
                bmr: nutritionGoals.bmr,
                tdee: nutritionGoals.tdee,
                calorieTarget: nutritionGoals.calorieTarget,
                protein: nutritionGoals.protein,
                carbs: nutritionGoals.carbs,
                fat: nutritionGoals.fat,
                isActive: true,
            },
        ],
        {
            session,
        },
    );

    return createdNutritionGoals[0];
};
