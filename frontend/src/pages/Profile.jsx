import { useState } from "react";
import Header from "../components/Header";
import ProfileWelcome from "../components/Profile/ProfileWelcome";
import ProfileInformation from "../components/Profile/ProfileInformation";
import ProfileActivity from "../components/Profile/ProfileActivity";
import ProfileObjective from "../components/Profile/ProfileObjective";
import { createProfile } from "../services/user.service";

const Profile = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const [profileData, setProfileData] = useState({
        gender: "",
        birthDate: "",
        height: "",
        weight: "",
        activityLevel: "",
        objectiveType: "",
    });

    const handleNext = () => {
        setCurrentStep((previousStep) => previousStep + 1);
    };

    const handleBack = () => {
        setCurrentStep((previousStep) => previousStep - 1);
    };

    const handleProfileSubmit = async () => {
        try {
            setIsLoading(true);
            setApiError("");

            const profilePayload = {
                ...profileData,
                height: Number(profileData.height),
                weight: Number(profileData.weight),
            };

            await createProfile(profilePayload);
            setCurrentStep(5);
        } catch (error) {
            setApiError(error.response?.data?.message || "Une erreur est survenue lors de la création du profil.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header variant='onboarding' />
            <main className='onboarding'>
                <section className='onboarding__steps'>
                    <div className='onboarding__steps--bullets'>
                        <span className='onboarding__steps--bullet active'></span>
                        <span className={`onboarding__steps--line ${currentStep >= 2 ? "active" : ""}`}></span>

                        <span className={`onboarding__steps--bullet ${currentStep >= 2 ? "active" : ""}`}></span>
                        <span className={`onboarding__steps--line ${currentStep >= 3 ? "active" : ""}`}></span>

                        <span className={`onboarding__steps--bullet ${currentStep >= 3 ? "active" : ""}`}></span>
                        <span className={`onboarding__steps--line ${currentStep >= 4 ? "active" : ""}`}></span>

                        <span className={`onboarding__steps--bullet ${currentStep >= 4 ? "active" : ""}`}></span>
                    </div>
                    <p>Étape {currentStep} sur 4</p>
                </section>
                {currentStep === 1 && <ProfileWelcome onNext={handleNext} />}
                {currentStep === 2 && (
                    <ProfileInformation
                        profileData={profileData}
                        setProfileData={setProfileData}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}
                {currentStep === 3 && (
                    <ProfileActivity
                        profileData={profileData}
                        setProfileData={setProfileData}
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}
                {currentStep === 4 && (
                    <ProfileObjective
                        profileData={profileData}
                        setProfileData={setProfileData}
                        onNext={handleProfileSubmit}
                        onBack={handleBack}
                        isLoading={isLoading}
                        apiError={apiError}
                    />
                )}
            </main>
        </>
    );
};

export default Profile;
