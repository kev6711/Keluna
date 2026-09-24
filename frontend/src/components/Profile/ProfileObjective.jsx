import { useState } from "react";
import { TrendingDown, Scale, TrendingUp } from "lucide-react";
import SelectionCard from "./SelectionCard";

const objectives = [
    {
        value: "weight_loss",
        label: "Perte de poids",
        description: "Déficit calorique",
        icon: TrendingDown,
    },
    {
        value: "maintenance",
        label: "Maintien du poids",
        description: "Maintien des besoins",
        icon: Scale,
    },
    {
        value: "weight_gain",
        label: "Prise de masse",
        description: "Favoriser la prise de masse musculaire",
        icon: TrendingUp,
    },
];

const ProfileObjective = ({ profileData, setProfileData, onNext, onBack, isLoading, apiError }) => {
    const [error, setError] = useState("");

    const handleObjectiveChange = (value) => {
        setProfileData((previousData) => ({
            ...previousData,
            objectiveType: value,
        }));

        setError("");
    };

    const handleNextStep = () => {
        if (!profileData.objectiveType) {
            setError("Veuillez sélectionner votre objectif.");
            return;
        }

        onNext();
    };

    return (
        <section className='onboarding__objective'>
            <h2>Votre objectif</h2>
            <p>Quel est votre objectif principal ?</p>

            <div className='onboarding__objective-list'>
                {objectives.map((objective) => (
                    <SelectionCard
                        key={objective.value}
                        variant='objective'
                        icon={objective.icon}
                        label={objective.label}
                        description={objective.description}
                        selected={profileData.objectiveType === objective.value}
                        onClick={() => handleObjectiveChange(objective.value)}
                    />
                ))}
            </div>

            {error && <p className='form__error'>{error}</p>}
            <div className='onboarding__actions'>
                <button className='onboarding__actions-back' type='button' onClick={onBack}>
                    Retour
                </button>
                <button
                    className='onboarding__actions-next'
                    type='button'
                    onClick={handleNextStep}
                    disabled={isLoading}
                >
                    {isLoading ? "Enregistrement..." : "Continuer"}
                </button>
            </div>
            {apiError && <p className='form__error'>{apiError}</p>}
        </section>
    );
};

export default ProfileObjective;
