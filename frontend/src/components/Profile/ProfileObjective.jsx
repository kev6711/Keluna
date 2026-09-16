import { useState } from "react";
import { TrendingDown, Scale, TrendingUp } from "lucide-react";

const objectives = [
    {
        value: "weight_loss",
        label: "Perdre du poids",
        description: "Déficit calorique",
        icon: TrendingDown,
    },
    {
        value: "maintenance",
        label: "Maintenir mon poids",
        description: "Maintien des besoins",
        icon: Scale,
    },
    {
        value: "weight_gain",
        label: "Prendre du poids",
        description: "Surplus calorique",
        icon: TrendingUp,
    },
];

const ProfileObjective = ({ profileData, setProfileData, onNext, onBack }) => {
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
        <section className='onboarding__step'>
            <h2>Votre objectif</h2>
            <p>Quel est votre objectif principal ?</p>

            <div className='onboarding__objective-list'>
                {objectives.map((objective) => {
                    const Icon = objective.icon;

                    return (
                        <button
                            key={objective.value}
                            type='button'
                            className={`onboarding__objective ${
                                profileData.objectiveType === objective.value ? "onboarding__objective--selected" : ""
                            }`}
                            onClick={() => handleObjectiveChange(objective.value)}
                        >
                            <Icon size={24} strokeWidth={2} aria-hidden='true' />
                            <span className='onboarding__objective-label'>{objective.label}</span>
                            <span className='onboarding__objective-description'>{objective.description}</span>
                        </button>
                    );
                })}
            </div>

            {error && <p className='form__error'>{error}</p>}
            <div className='onboarding__actions'>
                <button type='button' onClick={onBack}>
                    Retour
                </button>
                <button type='button' onClick={handleNextStep}>
                    Continuer
                </button>
            </div>
        </section>
    );
};

export default ProfileObjective;
