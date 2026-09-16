import { Sparkles } from "lucide-react";

const ProfileWelcome = ({ onNext }) => {
    return (
        <section className='onboarding__step'>
            <h2>Bienvenue sur Keluna</h2>
            <Sparkles size={24} aria-hidden='true' />

            <h3>Personnalisons votre suivi nutritionnel.</h3>

            <p>
                Quelques informations nous permettront de calculer vos besoins énergétiques et de définir vos objectifs
                nutritionnels.
            </p>
            <img src='../../assets/images/salade.png' alt='salade' />

            <div className='onboarding__actions'>
                <button type='button' onClick={onNext}>
                    Commencer
                </button>
            </div>
        </section>
    );
};

export default ProfileWelcome;
