import { Sparkles } from "lucide-react";
import salad from "../../assets/images/salade.png";

const ProfileWelcome = ({ onNext }) => {
    return (
        <section className='onboarding__welcome'>
            <div className='onboarding__welcome-title'>
                <h2>Bienvenue sur Keluna</h2>
                <Sparkles size={24} aria-hidden='true' />
            </div>
            <p className='onboarding__welcome-description'>Personnalisons votre suivi nutritionnel.</p>
            <p className='onboarding__welcome-explanation'>
                Quelques informations nous permettront de calculer vos besoins énergétiques et de définir vos objectifs
                nutritionnels.
            </p>
            <img src={salad} alt='salade' />

            <div className='onboarding__actions'>
                <button className='onboarding__actions-begin' type='button' onClick={onNext}>
                    Commencer
                </button>
            </div>
        </section>
    );
};

export default ProfileWelcome;
