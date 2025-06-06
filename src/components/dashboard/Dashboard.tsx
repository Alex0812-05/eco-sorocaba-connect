
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import SectionGrid from './SectionGrid';
import DailyTip from './DailyTip';
import ProfileSwitcher from '@/components/ProfileSwitcher';
import { useUserProfile } from '@/hooks/useUserProfile';

interface DashboardProps {
  userType?: string;
}

const Dashboard = ({ userType }: DashboardProps) => {
  const navigate = useNavigate();
  const { currentProfile } = useUserProfile();

  const handleStaffAreaClick = () => {
    navigate('/area-funcionario');
  };

  // Use currentProfile data directly for real-time updates
  const userPoints = currentProfile?.points || 0;
  const userName = currentProfile?.name || (userType === 'funcionario' ? 'Funcionário' : 'Aluno');

  console.log('Dashboard - pontos atuais:', userPoints);
  console.log('Dashboard - perfil atual:', currentProfile);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <img
              src="/lovable-uploads/85ff4149-89f6-4c10-94ff-c436f6800e69.png"
              alt="SeleCollect Logo"
              className="h-10 w-10"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">SeleCollect</h1>
              <p className="text-sm text-gray-600">Sustentabilidade ao seu alcance</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ProfileSwitcher />
            
            {userType === 'funcionario' && (
              <Button 
                onClick={handleStaffAreaClick}
                className="flex items-center gap-2"
                variant="outline"
              >
                <Users size={16} />
                Área do Funcionário
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* User Info Section */}
      <div className="bg-primary text-white p-6 mx-4 mt-4 rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Olá, {userName}!</h2>
            <p className="text-white text-opacity-90">
              {userType === 'funcionario' ? 'Área do Funcionário' : 'Painel do Aluno'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Pontuação</p>
            <p className="text-2xl font-bold">{userPoints} pts</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-4 mt-6">
        <div className="mb-4">
          <h2 className="text-xl font-medium">Escolha uma opção</h2>
        </div>
        
        <SectionGrid />
        <DailyTip />
      </div>

      <NavBar />
    </div>
  );
};

export default Dashboard;
