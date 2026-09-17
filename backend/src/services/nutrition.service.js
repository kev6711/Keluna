const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
};

const objectiveFactors = {
    weight_loss: 0.85,
    maintenance: 1,
    weight_gain: 1.1,
};

const proteinFactors = {
    weight_loss: 2.0,
    maintenance: 1.6,
    weight_gain: 2.0,
};

const fatFactors = {
    weight_loss: 0.8,
    maintenance: 1.0,
    weight_gain: 0.9,
};

export const calculateAge = (birthDate) => {
    const parsedBirthDate = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - parsedBirthDate.getFullYear();
    const monthDifference = today.getMonth() - parsedBirthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < parsedBirthDate.getDate())) {
        age--;
    }

    return age;
};

export const calculateBmr = ({ gender, age, height, weight }) => {
    // Equation de Mifflin-St Jeor pour estimer le métabolisme au repos
    const baseBmr = 10 * weight + 6.25 * height - 5 * age;

    if (gender === "male") {
        return Math.round(baseBmr + 5);
    }
    if (gender === "female") {
        return Math.round(baseBmr - 161);
    }

    throw new Error("Le sexe renseigné n'est pas valide pour le calcul du BMR.");
};

// TDEE = Estimation de la dépense énergétique quotidienne avec prise en compte de l'activité
export const calculateTdee = ({ bmr, activityLevel }) => {
    const activityFactor = activityFactors[activityLevel];

    if (!activityFactor) {
        throw new Error("Le niveau d'activité n'est pas valide pour le calcul du TDEE.");
    }

    return Math.round(bmr * activityFactor);
};

export const calculateCalorieTarget = ({ tdee, objectiveType }) => {
    const objectiveFactor = objectiveFactors[objectiveType];

    if (!objectiveFactor) {
        throw new Error("L'objectif n'est pas valide pour le calcul des calories.");
    }

    return Math.round(tdee * objectiveFactor);
};

export const calculateProtein = ({ weight, objectiveType }) => {
    const proteinFactor = proteinFactors[objectiveType];

    if (!proteinFactor) {
        throw new Error("L'objectif n'est pas valide pour le calcul des protéines.");
    }

    return Math.round(weight * proteinFactor);
};

export const calculateFat = ({ weight, objectiveType }) => {
    const fatFactor = fatFactors[objectiveType];

    if (!fatFactor) {
        throw new Error("L'objectif n'est pas valide pour le calcul des lipides.");
    }

    return Math.round(weight * fatFactor);
};

export const calculateCarbs = ({ calorieTarget, protein, fat }) => {
    const proteinCalories = protein * 4;
    const fatCalories = fat * 9;
    const remainingCalories = calorieTarget - proteinCalories - fatCalories;

    if (remainingCalories < 0) {
        throw new Error("L'objectif calorique est insuffisant pour calculer les glucides.");
    }

    return Math.round(remainingCalories / 4);
};

export const calculateMacroDistribution = ({ calorieTarget, weight, protein, carbs, fat }) => {
    const proteinCalories = protein * 4;
    const carbsCalories = carbs * 4;
    const fatCalories = fat * 9;

    return {
        proteinPerKg: Number((protein / weight).toFixed(2)),
        carbsPerKg: Number((carbs / weight).toFixed(2)),
        fatPerKg: Number((fat / weight).toFixed(2)),

        proteinPercentage: Math.round((proteinCalories / calorieTarget) * 100),
        carbsPercentage: Math.round((carbsCalories / calorieTarget) * 100),
        fatPercentage: Math.round((fatCalories / calorieTarget) * 100),
    };
};

export const evaluateNutritionGoals = ({ distribution }) => {
    const warnings = [];

    if (distribution.fatPercentage < 20) {
        warnings.push({
            type: "low_fat_percentage",
            message: "La part des lipides représente moins de 20 % de l'apport énergétique.",
        });
    }

    if (distribution.carbsPerKg > 6) {
        warnings.push({
            type: "high_carbohydrate_intake",
            message:
                "L'apport en glucides est élevé et devrait être interprété selon le type et la charge d'activité physique.",
        });
    }

    return {
        requiresReview: warnings.length > 0,
        warnings,
    };
};

export const calculateTargetRange = ({ target, tolerance }) => {
    return {
        target,
        min: Math.round(target * (1 - tolerance)),
        max: Math.round(target * (1 + tolerance)),
    };
};

export const calculateNutritionRanges = ({ calorieTarget, protein, carbs, fat }) => {
    return {
        calories: calculateTargetRange({
            target: calorieTarget,
            tolerance: 0.05,
        }),

        protein: calculateTargetRange({
            target: protein,
            tolerance: 0.1,
        }),

        carbs: calculateTargetRange({
            target: carbs,
            tolerance: 0.15,
        }),

        fat: calculateTargetRange({
            target: fat,
            tolerance: 0.1,
        }),
    };
};

export const calculateNutritionGoals = (profile) => {
    const age = calculateAge(profile.birthDate);

    const bmr = calculateBmr({
        gender: profile.gender,
        age,
        height: profile.height,
        weight: profile.weight,
    });

    const tdee = calculateTdee({
        bmr,
        activityLevel: profile.activityLevel,
    });

    const calorieTarget = calculateCalorieTarget({
        tdee,
        objectiveType: profile.objectiveType,
    });

    const protein = calculateProtein({
        weight: profile.weight,
        objectiveType: profile.objectiveType,
    });

    const fat = calculateFat({
        weight: profile.weight,
        objectiveType: profile.objectiveType,
    });

    const carbs = calculateCarbs({
        calorieTarget,
        protein,
        fat,
    });

    const distribution = calculateMacroDistribution({
        calorieTarget,
        weight: profile.weight,
        protein,
        carbs,
        fat,
    });

    const evaluation = evaluateNutritionGoals({
        distribution,
    });

    const ranges = calculateNutritionRanges({
        calorieTarget,
        protein,
        carbs,
        fat,
    });

    return {
        bmr,
        tdee,
        calorieTarget,
        protein,
        carbs,
        fat,
        distribution,
        evaluation,
        ranges,
    };
};
