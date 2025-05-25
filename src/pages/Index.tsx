
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/dashboard/Dashboard";
import UserTypeSelector from "@/components/UserTypeSelector";

const Index = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<string | null>(null);

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

  const handleUserTypeSelect = (type: string) => {
    setUserType(type);
    localStorage.setItem('userType', type);
    
    // Create a mock user for the session
    const mockUser = {
      id: `${type}_${Date.now()}`,
      name: type === 'funcionario' ? 'Funcionário' : 'Aluno',
      userType: type,
      points: 0,
      correctDisposals: 0,
      badges: 0
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  // If user type is not selected, show selector
  if (!userType) {
    return <UserTypeSelector onSelect={handleUserTypeSelect} />;
  }

  return <Dashboard userType={userType} />;
};

export default Index;
