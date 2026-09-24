import { useState } from "react";
import { Mars, Venus } from "lucide-react";

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
            if (age < 18) {
                newErrors.birthDate = "Vous devez avoir au moins 18 ans pour utiliser Keluna.";
            }
        }

        const height = Number(profileData.height);
        if (!profileData.height) {
            newErrors.height = "Veuillez renseigner votre taille.";
        } else if (Number.isNaN(height) || height < 100 || height > 250) {
            newErrors.height = "La taille doit être comprise entre 100 et 250 cm.";
        }

        const weight = Number(profileData.weight);
        if (!profileData.weight) {
            newErrors.weight = "Veuillez renseigner votre poids.";
        } else if (Number.isNaN(weight) || weight < 30 || weight > 300) {
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
        <section className='onboarding__information'>
            <h2 className='onboarding__information-title'>Votre profil</h2>
            <p className='onboarding__information-description'>
                Ces informations nous permettent de calculer vos besoins énergétiques.
            </p>

            <div className='onboarding__form'>
                <fieldset className='onboarding__field'>
                    <legend>Sexe</legend>
                    <div className='onboarding__choices'>
                        <button
                            type='button'
                            className={`onboarding__choice ${profileData.gender === "male" ? "onboarding__choice--selected" : ""}`}
                            onClick={() => handleChange("gender", "male")}
                            aria-pressed={profileData.gender === "male"}
                        >
                            <Mars size={24} aria-hidden='true' />
                            <span>Homme</span>
                        </button>

                        <button
                            type='button'
                            className={`onboarding__choice ${profileData.gender === "female" ? "onboarding__choice--selected" : ""}`}
                            onClick={() => handleChange("gender", "female")}
                            aria-pressed={profileData.gender === "male"}
                        >
                            <Venus size={24} aria-hidden='true' />
                            <span>Femme</span>
                        </button>
                    </div>
                    {errors.gender && <p className='form__error'>{errors.gender}</p>}
                </fieldset>

                <div className='onboarding__field'>
                    <label htmlFor='birthDate'>Date de naissance</label>
                    <input
                        className={errors.birthDate ? "onboarding__input--error" : ""}
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
                    <div className='onboarding__field-input'>
                        <input
                            className={errors.height ? "onboarding__input--error" : ""}
                            id='height'
                            type='number'
                            min='100'
                            max='250'
                            step='1'
                            value={profileData.height}
                            onChange={(e) => handleChange("height", e.target.value)}
                        />
                        <span>cm</span>
                    </div>
                    {errors.height && <p className='form__error'>{errors.height}</p>}
                </div>

                <div className='onboarding__field'>
                    <label htmlFor='weight'>Poids</label>
                    <div className='onboarding__field-input'>
                        <input
                            className={errors.weight ? "onboarding__input--error" : ""}
                            id='weight'
                            type='number'
                            min='30'
                            max='300'
                            step='0.1'
                            value={profileData.weight}
                            onChange={(e) => handleChange("weight", e.target.value)}
                        />
                        <span>kg</span>
                    </div>
                    {errors.weight && <p className='form__error'>{errors.weight}</p>}
                </div>
            </div>
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

export default ProfileInformation;
