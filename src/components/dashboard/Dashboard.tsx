
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import SectionGrid from './SectionGrid';
import DailyTip from './DailyTip';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleStaffAreaClick = () => {
    navigate('/area-funcionario');
  };

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
          
          <Button 
            onClick={handleStaffAreaClick}
            className="flex items-center gap-2"
            variant="outline"
          >
            <Users size={16} />
            Área do Funcionário
          </Button>
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
