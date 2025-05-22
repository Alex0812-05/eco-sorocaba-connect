
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import NavBar from '@/components/NavBar';
import ResetPoints from '@/components/admin/ResetPoints';
import UserHeader from './UserHeader';
import SectionGrid from './SectionGrid';
import DailyTip from './DailyTip';

interface UserData {
  id: string;
  name: string;
  email: string;
  userType: string;
  points: number;
  correctDisposals: number;
  badges: number;
}

interface DashboardProps {
  userData: UserData;
  onLogout: () => void;
  onUserDataRefresh: () => void;
}

const Dashboard = ({ userData, onLogout, onUserDataRefresh }: DashboardProps) => {
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout();
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <UserHeader userData={userData} />

      {/* Main content */}
      <div className="p-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Escolha uma opção</h2>
          
          <div className="flex gap-2">
            {userData.userType === "funcionario" && (
              <ResetPoints userId={userData.id} onReset={onUserDataRefresh} />
            )}
            
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut size={16} />
              Sair
            </Button>
          </div>
        </div>
        
        <SectionGrid />
        <DailyTip />
      </div>

      <NavBar />
    </div>
  );
};

export default Dashboard;
