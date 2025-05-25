
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/dashboard/Dashboard";

const Index = () => {
  const navigate = useNavigate();

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
  }, []);

  return <Dashboard />;
};

export default Index;
