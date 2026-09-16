import { useState } from "react";
import Header from "../components/Header";
import ProfileWelcome from "../components/Profile/ProfileWelcome";
import ProfileInformation from "../components/Profile/ProfileInformation";
import ProfileActivity from "../components/Profile/ProfileActivity";
import ProfileObjective from "../components/Profile/ProfileObjective";
import { CircleSmall } from "lucide-react";

const Profile = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [profileData, setProfileData] = useState({
        gender: "",
        birthDate: "",
        height: "",
        weight: "",
        activityLevel: "",
        objectiveType: "",
    });

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <>
            <Header />
            <main className='onboarding'>
                <div className='onboarding__steps'>
                    <div className='onboarding__steps--bullets'>
                        <CircleSmall size={24} aria-hidden='true' />
                        <CircleSmall size={24} aria-hidden='true' />
                        <CircleSmall size={24} aria-hidden='true' />
                        <CircleSmall size={24} aria-hidden='true' />
                    </div>
                    <p>Étape {currentStep} sur 4</p>
                </div>
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
                        onNext={handleNext}
                        onBack={handleBack}
                    />
                )}
            </main>
        </>
    );
};

export default Profile;
