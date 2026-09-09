import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const register = async (req, res) => {
    try {
        const { firstName, email, password, confirmPassword, acceptTerms } = req.body;

        // Vérification des champs
        if (!firstName || !email || !password || !confirmPassword) {
            return res.status(400).json({
                message: "Tous les champs sont obligatoires.",
            });
        }

        // Validation de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const normalizedEmail = email.trim().toLowerCase();

        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({
                message: "L'adresse email n'est pas valide.",
            });
        }

        // Longueur du mot de passe
        if (password.length < 8) {
            return res.status(400).json({
                message: "Le mot de passe doit contenir au moins 8 caractères.",
            });
        }

        // Confirmation du mot de passe
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Les mots de passe ne correspondent pas.",
            });
        }

        // Conditions utilisation
        if (acceptTerms !== true) {
            return res.status(400).json({
                message: "Vous devez accepter les conditions d'utilisation.",
            });
        }

        // Vérification de l'utilisateur existant
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(409).json({
                message: "Un compte existe déjà avec cette adresse email.",
            });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const user = await User.create({
            firstName: firstName.trim(),
            email: normalizedEmail,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Compte créé avec succès.",
            user: {
                id: user._id,
                firstName: user.firstName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Une erreur est survenue lors de l'inscription.",
        });
    }
};
