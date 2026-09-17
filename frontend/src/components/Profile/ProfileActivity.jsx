import { useState } from "react";
import { Armchair, Footprints, Bike, Dumbbell, Flame } from "lucide-react";

const activityLevels = [
    {
        value: "sedentary",
        label: "Sédentaire",
        description: "Peu ou aucune activité physique.",
        icon: Armchair,
    },
    {
        value: "light",
        label: "Légèrement actif",
        description: "1 à 3 séances par semaine.",
        icon: Footprints,
    },
    {
        value: "moderate",
        label: "Modérément actif",
        description: "3 à 5 séances par semaine.",
        icon: Bike,
    },
    {
        value: "active",
        label: "Très actif",
        description: "6 à 7 séances ou travail physique.",
        icon: Dumbbell,
    },
    {
        value: "very_active",
        label: "Extrêmement actif",
        description: "Athlète ou activité quotidienne très intense.",
        icon: Flame,
    },
];

const ProfileActivity = ({ profileData, setProfileData, onNext, onBack }) => {
    const [error, setError] = useState("");

    const handleActivityChange = (value) => {
        setProfileData((previousData) => ({
            ...previousData,
            activityLevel: value,
        }));

        setError("");
    };

    const handleNextStep = () => {
        if (!profileData.activityLevel) {
            setError("Veuillez sélectionner votre niveau d'activité.");
            return;
        }
        onNext();
    };

    return (
        <section className='onboarding__step'>
            <h2>Votre niveau d'activité</h2>
            <p>Sélectionnez le niveau qui correspond le mieux à votre activité physique habituelle.</p>

            <div className='onboarding__activity-list'>
                {activityLevels.map((activity) => {
                    const Icon = activity.icon;
                    return (
                        <button
                            key={activity.value}
                            type='button'
                            className={`onboarding__activity ${
                                profileData.activityLevel === activity.value ? "onboarding__activity--selected" : ""
                            }`}
                            onClick={() => handleActivityChange(activity.value)}
                            aria-pressed={profileData.activityLevel === activity.value}
                        >
                            <Icon size={24} strokeWidth={2} aria-hidden='true' />
                            <span className='onboarding__activity-label'>{activity.label}</span>
                            <span className='onboarding__activity-description'>{activity.description}</span>
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

export default ProfileActivity;
