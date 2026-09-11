import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { Menu, X } from "lucide-react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className='header'>
            <div className='header__logo'>
                <Link to='/'>
                    <img src={logo} alt='Logo Keluna' />
                </Link>
                <h1>KELUNA</h1>
            </div>
            <button
                className={`header__burger ${isMenuOpen ? "header__burger--open" : ""}`}
                type='button'
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <nav className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
                <ul>
                    <li>
                        <NavLink
                            to='/login'
                            className={({ isActive }) => `header__link ${isActive ? "header__link--active" : ""}`}
                        >
                            Connexion
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/register'
                            className={({ isActive }) => `header__link ${isActive ? "header__link--active" : ""}`}
                        >
                            Créer un compte
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
