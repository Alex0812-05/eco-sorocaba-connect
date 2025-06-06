
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/dashboard/Dashboard";
import UserTypeSelector from "@/components/UserTypeSelector";
import { useUserProfile } from "@/hooks/useUserProfile";

const Index = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string | null>(null);
  const { loadUserProfile } = useUserProfile();

  const openOnboarding = () => {
    navigate("/onboarding");
  };

  useEffect(() => {
    // On first visit, redirect to onboarding
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      localStorage.setItem('hasVisitedBefore', 'true');
      openOnboarding();
    }

    // Check if user type is already selected
    const savedUserType = localStorage.getItem('userType');
    if (savedUserType) {
      setUserType(savedUserType);
    }
  }, []);

  const handleUserTypeSelect = async (type: string) => {
    setUserType(type);
    localStorage.setItem('userType', type);
    
    // Load the profile for this user type
    await loadUserProfile(type);
  };

  // If user type is not selected, show selector
  if (!userType) {
    return <UserTypeSelector onSelect={handleUserTypeSelect} />;
  }

  return <Dashboard userType={userType} />;
};

export default Index;
