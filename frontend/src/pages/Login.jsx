import { useLocation } from "react-router-dom";

const Login = () => {
    const location = useLocation();

    return (
        <main>
            <h1>Connexion</h1>

            {location.state?.successMessage && <p className='form__success'>{location.state.successMessage}</p>}
        </main>
    );
};

export default Login;
