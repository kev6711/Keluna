import { useState } from "react";
import { Armchair, Footprints, Bike, Dumbbell, Flame } from "lucide-react";
import SelectionCard from "./SelectionCard";

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
        description: "Activité quotidienne très intense.",
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
        <section className='onboarding__activity'>
            <h2>Votre niveau d'activité</h2>
            <p>Sélectionnez le niveau qui correspond le mieux à votre activité physique habituelle.</p>

            <div className='onboarding__activity-list'>
                {activityLevels.map((activity) => (
                    <SelectionCard
                        key={activity.value}
                        variant='activity'
                        icon={activity.icon}
                        label={activity.label}
                        description={activity.description}
                        selected={profileData.activityLevel === activity.value}
                        onClick={() => handleActivityChange(activity.value)}
                    />
                ))}
            </div>

            {error && <p className='form__error'>{error}</p>}
            <div className='onboarding__actions'>
                <button className='onboarding__actions-back' type='button' onClick={onBack}>
                    Retour
                </button>
                <button className='onboarding__actions-next' type='button' onClick={handleNextStep}>
                    Continuer
                </button>
            </div>
        </section>
    );
};

export default ProfileActivity;
