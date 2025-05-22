
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import StudentLogin from "@/components/auth/StudentLogin";
import StaffLogin from "@/components/StaffLogin";
import Dashboard from "@/components/dashboard/Dashboard";

interface UserData {
  id: string;
  name: string;
  email: string;
  userType: string;
  points: number;
  correctDisposals: number;
  badges: number;
}

const Index = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showStaffLogin, setShowStaffLogin] = useState(false);

  useEffect(() => {
    // Verificar se o usuário está logado
    const userJson = localStorage.getItem("user");
    
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        setUserData(user);
      } catch (error) {
        console.error("Erro ao parse do usuário:", error);
      }
    }
  }, []);

  const fetchUserData = async () => {
    if (!userData?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userData.id)
        .single();
        
      if (error) {
        console.error('Erro ao buscar usuário:', error);
        return;
      }
      
      if (data) {
        // Atualizar os dados do usuário no state e no localStorage
        const updatedUser = {
          ...userData,
          name: data.name,
          points: data.points || 0,
          correctDisposals: data.correct_disposals || 0,
          badges: data.badges || 0,
        };
        
        setUserData(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  useEffect(() => {
    if (userData?.id) {
      fetchUserData();
    }
  }, [userData?.id]);

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

  const handleLoginSuccess = (userData: UserData) => {
    setUserData(userData);
  };

  const handleLogout = () => {
    setUserData(null);
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <img
              src="/lovable-uploads/85ff4149-89f6-4c10-94ff-c436f6800e69.png"
              alt="SeleCollect Logo"
              className="h-24 w-24"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-6">
            SeleCollect
          </h1>

          {showStaffLogin ? (
            <div className="space-y-4">
              <StaffLogin onLoginSuccess={() => {
                const userJson = localStorage.getItem("user");
                if (userJson) {
                  try {
                    const user = JSON.parse(userJson);
                    setUserData(user);
                  } catch (error) {
                    console.error("Erro ao parse do usuário:", error);
                  }
                }
              }} />
              <Button 
                variant="link" 
                className="w-full" 
                onClick={() => setShowStaffLogin(false)}
              >
                Voltar para login de aluno
              </Button>
            </div>
          ) : (
            <StudentLogin 
              onLoginSuccess={handleLoginSuccess}
              onShowStaffLogin={() => setShowStaffLogin(true)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <Dashboard 
      userData={userData}
      onLogout={handleLogout}
      onUserDataRefresh={fetchUserData}
    />
  );
};

export default Index;
