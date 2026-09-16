import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { loginUser } from "../services/auth.service";
import MacroCard from "../components/MacroCard";
import Toast from "../components/Toast";
import { Droplet, Eye, EyeOff, Flame, Lock, Mail, Sprout, Wheat } from "lucide-react";
import salad from "../assets/images/salade.png";
import AuthLayout from "../layouts/AuthLayout";

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const [successMessage, setSuccessMessage] = useState(location.state?.successMessage || "");

    const validateForm = () => {
        const newErrors = {};
        const normalizedEmail = email.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!normalizedEmail) {
            newErrors.email = "Veuillez renseigner une adresse mail.";
        } else if (!emailRegex.test(normalizedEmail)) {
            newErrors.email = "L'adresse e-mail n'est pas valide.";
        }
        if (!password) {
            newErrors.password = "Veuillez renseigner un mot de passe.";
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
            const data = await loginUser({
                email,
                password,
            });

            localStorage.setItem("token", data.token);

            if (data.user.hasProfile) {
                navigate("/dashboard");
            } else {
                navigate("/profile");
            }
        } catch (error) {
            setApiError(error.response?.data?.message || "Impossible de se connecter. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!successMessage) return;

        const timer = setTimeout(() => {
            setSuccessMessage("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [successMessage]);

    return (
        <>
            <Toast message={successMessage} />

            <AuthLayout
                visual={
                    <>
                        <img className='login__illustration' src={salad} alt="Bol composé d'aliments frais" />
                        <h2>Suivez vos objectifs jour après jour.</h2>
                        <p className='login__description'>
                            Keluna vous aide à garder le contrôle sur votre nutrition et à atteindre vos objectifs.
                        </p>

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
                    </>
                }
                content={
                    <>
                        <h2>Connectez-vous à votre compte</h2>
                        <p>Connectez-vous pour retrouver votre suivi nutritionnel.</p>

                        <form className='form' onSubmit={handleSubmit}>
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
                                        aria-label={
                                            showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"
                                        }
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

                            <button className='form__submit' type='submit' disabled={isLoading}>
                                {isLoading ? "Connexion en cours ..." : "Se connecter"}
                            </button>
                            {apiError && <p className='form__error'>{apiError}</p>}
                        </form>
                    </>
                }
                footer={
                    <>
                        <p>Pas encore de compte ?</p>
                        <Link to='/register'>Créer un compte</Link>
                    </>
                }
            />
        </>
    );
};

export default Login;
