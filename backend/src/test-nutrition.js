import { calculateNutritionGoals, calculateNutritionRanges } from "./services/nutrition.service.js";

const profiles = [
    {
        name: "Homme - perte de poids - modérément actif",
        profile: {
            gender: "male",
            birthDate: "1995-06-15",
            height: 178,
            weight: 75,
            activityLevel: "moderate",
            objectiveType: "weight_loss",
        },
    },
    {
        name: "Homme - prise de muscle - très actif",
        profile: {
            gender: "male",
            birthDate: "1995-06-15",
            height: 178,
            weight: 75,
            activityLevel: "active",
            objectiveType: "weight_gain",
        },
    },
    {
        name: "Femme - maintien - activité légère",
        profile: {
            gender: "female",
            birthDate: "1995-06-15",
            height: 165,
            weight: 60,
            activityLevel: "light",
            objectiveType: "maintenance",
        },
    },
];

for (const test of profiles) {
    const result = calculateNutritionGoals(test.profile);

    console.log(`\n${test.name}`);
    console.log(JSON.stringify(result, null, 2));
}
