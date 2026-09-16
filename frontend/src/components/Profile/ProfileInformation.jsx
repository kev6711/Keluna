import { useState } from "react";

const ProfileInformation = ({ profileData, setProfileData, onNext, onBack }) => {
    const [errors, setErrors] = useState({});
    const today = new Date().toISOString().split("T")[0];

    const handleChange = (field, value) => {
        setProfileData((previousData) => ({
            ...previousData,
            [field]: value,
        }));
        setErrors((previousErrors) => ({
            ...previousErrors,
            [field]: "",
        }));
    };

    const validateStep = () => {
        const newErrors = {};

        if (!profileData.gender) {
            newErrors.gender = "Veuillez sélectionner votre sexe.";
        }
        if (!profileData.birthDate) {
            newErrors.birthDate = "Veuillez renseigner votre date de naissance.";
        } else {
            const parsedBirthDate = new Date(profileData.birthDate);
            const today = new Date();
            let age = today.getFullYear() - parsedBirthDate.getFullYear();
            const monthDifference = today.getMonth() - parsedBirthDate.getMonth();

            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < parsedBirthDate.getDate())) {
                age--;
            }
            if (age < 16) {
                newErrors.birthDate = "Vous devez avoir au moins 16 ans pour utiliser Keluna.";
            }
        }

        const height = Number(profileData.height);
        if (!profileData.height) {
            newErrors.height = "Veuillez renseigner votre taille.";
        } else if (height < 100 || height > 250) {
            newErrors.height = "La taille doit être comprise entre 100 et 250 cm.";
        }

        const weight = Number(profileData.weight);
        if (!profileData.weight) {
            newErrors.weight = "Veuillez renseigner votre poids.";
        } else if (weight < 30 || weight > 300) {
            newErrors.weight = "Le poids doit être compris entre 30 et 300 kg.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (!validateStep()) return;

        onNext();
    };

    return (
        <section className='onboarding__step'>
            <h2>Votre profil</h2>
            <p>Ces informations nous permettent de calculer vos besoins énergétiques.</p>

            <div className='onboarding__field'>
                <p>Sexe</p>
                <div className='onboarding__choices'>
                    <button
                        type='button'
                        className={`onboarding__choice ${profileData.gender === "male" ? "onboarding__choice--selected" : ""}`}
                        onClick={() => handleChange("gender", "male")}
                    >
                        Homme
                    </button>

                    <button
                        type='button'
                        className={`onboarding__choice ${profileData.gender === "female" ? "onboarding__choice--selected" : ""}`}
                        onClick={() => handleChange("gender", "female")}
                    >
                        Femme
                    </button>
                    {errors.gender && <p className='form__error'>{errors.gender}</p>}
                </div>
            </div>

            <div className='onboarding__field'>
                <label htmlFor='birthDate'>Date de naissance</label>
                <input
                    id='birthDate'
                    type='date'
                    max={today}
                    value={profileData.birthDate}
                    onChange={(e) => handleChange("birthDate", e.target.value)}
                />
                {errors.birthDate && <p className='form__error'>{errors.birthDate}</p>}
            </div>

            <div className='onboarding__field'>
                <label htmlFor='height'>Taille</label>
                <input
                    id='height'
                    type='number'
                    placeholder='cm'
                    value={profileData.height}
                    onChange={(e) => handleChange("height", e.target.value)}
                />
                {errors.height && <p className='form__error'>{errors.height}</p>}
            </div>

            <div className='onboarding__field'>
                <label htmlFor='weight'>Poids</label>
                <input
                    id='weight'
                    type='number'
                    placeholder='kg'
                    value={profileData.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                />
                {errors.weight && <p className='form__error'>{errors.weight}</p>}
            </div>

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

export default ProfileInformation;
