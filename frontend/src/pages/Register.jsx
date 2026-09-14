import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/auth.service";
import MacroCard from "../components/MacroCard";
import { Droplet, Eye, EyeOff, Flame, Lock, Mail, Sprout, User, Wheat } from "lucide-react";
import salad from "../assets/images/salade.png";
import Header from "../components/Header";

const Register = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const validateForm = () => {
        const newErrors = {};
        const normalizedEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!firstName.trim()) {
            newErrors.firstName = "Veuillez renseigner un prénom.";
        }
        if (!normalizedEmail) {
            newErrors.email = "Veuillez renseigner une adresse mail.";
        } else if (!emailRegex.test(normalizedEmail)) {
            newErrors.email = "L'adresse e-mail n'est pas valide.";
        }
        if (!password) {
            newErrors.password = "Veuillez renseigner un mot de passe.";
        } else if (password.length < 8) {
            newErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = "Veuillez confirmer votre mot de passe.";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
        }
        if (!acceptTerms) {
            newErrors.acceptTerms = "Vous devez accepter les conditions d'utilisation.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setApiError("");

        try {
            const data = await registerUser({
                firstName,
                email,
                password,
                confirmPassword,
                acceptTerms,
            });
            navigate("/login", {
                state: {
                    successMessage: data.message,
                },
            });
        } catch (error) {
            setApiError(error.response?.data?.message || "Impossible de créer le compte. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='register-page'>
            <Header />
            <main className='register'>
                <section className='register__visual'>
                    <img className='register__illustration' src={salad} alt="Bol composé d'aliments frais" />
                    <h2>Atteignez vos objectifs avec Keluna</h2>

                    <div className='macros'>
                        <MacroCard
                            icon={<Flame size={20} aria-hidden='true' />}
                            name='Calories'
                            current={1840}
                            target={2200}
                            unit='kcal'
                        />
                        <MacroCard
                            icon={<Sprout size={20} aria-hidden='true' />}
                            name='Protéines'
                            current={120}
                            target={150}
                            unit='g'
                        />
                        <MacroCard
                            icon={<Wheat size={20} aria-hidden='true' />}
                            name='Glucides'
                            current={180}
                            target={250}
                            unit='g'
                        />
                        <MacroCard
                            icon={<Droplet size={20} aria-hidden='true' />}
                            name='Lipides'
                            current={35}
                            target={70}
                            unit='g'
                        />
                    </div>
                </section>

                <section className='register__content'>
                    <h2>Créer votre compte</h2>
                    <p>Commencez votre suivi nutritionnel personnalisé avec Keluna.</p>

                    <form className='form' onSubmit={handleSubmit}>
                        <div className='form__group'>
                            <label className='form__label' htmlFor='firstName'>
                                Prénom
                            </label>
                            <div className='form__input-wrapper'>
                                <User size={20} aria-hidden='true' />
                                <input
                                    className={`form__input ${errors.firstName ? "form__input--error" : ""}`}
                                    type='text'
                                    name='firstName'
                                    id='firstName'
                                    placeholder='Votre prénom'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <p className='error'>{errors.firstName}</p>}
                            </div>
                        </div>

                        <div className='form__group'>
                            <label className='form__label' htmlFor='email'>
                                Adresse e-mail
                            </label>
                            <div className='form__input-wrapper'>
                                <Mail size={20} aria-hidden='true' />
                                <input
                                    className={`form__input ${errors.email ? "form__input--error" : ""}`}
                                    type='email'
                                    name='email'
                                    id='email'
                                    placeholder='Votre adresse e-mail'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <p className='error'>{errors.email}</p>}
                            </div>
                        </div>

                        <div className='form__group'>
                            <label className='form__label' htmlFor='password'>
                                Mot de passe
                            </label>
                            <div className='form__input-wrapper'>
                                <Lock size={20} aria-hidden='true' />
                                <input
                                    className={`form__input ${errors.password ? "form__input--error" : ""}`}
                                    type={showPassword ? "text" : "password"}
                                    name='password'
                                    id='password'
                                    placeholder='Mot de passe'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className='form__password-toggle'
                                    type='button'
                                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <Eye size={20} aria-hidden='true' />
                                    ) : (
                                        <EyeOff size={20} aria-hidden='true' />
                                    )}
                                </button>
                                {errors.password && <p className='error'>{errors.password}</p>}
                            </div>
                        </div>

                        <div className='form__group'>
                            <label className='form__label' htmlFor='confirmPassword'>
                                Confirmer le mot de passe
                            </label>
                            <div className='form__input-wrapper'>
                                <Lock size={20} aria-hidden='true' />
                                <input
                                    className={`form__input ${errors.confirmPassword ? "form__input--error" : ""}`}
                                    type={showConfirmPassword ? "text" : "password"}
                                    name='confirmPassword'
                                    id='confirmPassword'
                                    placeholder='Confirmer le mot de passe'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    className='form__password-toggle'
                                    type='button'
                                    aria-label={
                                        showConfirmPassword
                                            ? "Masquer la confirmation du mot de passe"
                                            : "Afficher la confirmation du mot de passe"
                                    }
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <Eye size={20} aria-hidden='true' />
                                    ) : (
                                        <EyeOff size={20} aria-hidden='true' />
                                    )}
                                </button>
                                {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        <div className='form__terms'>
                            <input
                                className={`${errors.acceptTerms ? "form__terms--error" : ""}`}
                                type='checkbox'
                                name='acceptTerms'
                                id='acceptTerms'
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                            />
                            <label htmlFor='acceptTerms'>
                                J'accepte les <a href='/'>conditions d'utilisation</a> et la{" "}
                                <a href='/'>politique de confidentialité</a>.
                            </label>
                            {errors.acceptTerms && <p className='error'>{errors.acceptTerms}</p>}
                        </div>

                        <button className='form__submit' type='submit' disabled={isLoading}>
                            {isLoading ? "En cours de création ..." : "Créer mon compte"}
                        </button>
                        {apiError && <p className='form__error'>{apiError}</p>}
                    </form>
                </section>
            </main>
            <footer className='footer'>
                <p>Déjà un compte ?</p>
                <Link to='/login'>Se connecter</Link>
            </footer>
        </div>
    );
};

export default Register;
