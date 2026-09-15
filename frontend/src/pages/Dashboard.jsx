import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/auth.service";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };

    return (
        <main>
            <h1>Dashboard</h1>
            <p>Vous êtes connecté.</p>

            <button type='button' onClick={handleLogout}>
                Se déconnecter
            </button>
        </main>
    );
};

export default Dashboard;
