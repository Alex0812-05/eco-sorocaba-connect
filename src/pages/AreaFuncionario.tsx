
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, MapPin, FileText, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CadastroDescarte from '@/components/staff/CadastroDescarte';
import PontosColeta from '@/components/staff/PontosColeta';
import RelatoriosDescarte from '@/components/staff/RelatoriosDescarte';
import RankingFuncionarios from '@/components/staff/RankingFuncionarios';

type ActiveSection = 'menu' | 'cadastro' | 'pontos' | 'relatorios' | 'ranking';

const AreaFuncionario = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<ActiveSection>('menu');

  const handleBackToHome = () => {
    navigate('/');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'cadastro':
        return <CadastroDescarte onBack={() => setActiveSection('menu')} />;
      case 'pontos':
        return <PontosColeta onBack={() => setActiveSection('menu')} />;
      case 'relatorios':
        return <RelatoriosDescarte onBack={() => setActiveSection('menu')} />;
      case 'ranking':
        return <RankingFuncionarios onBack={() => setActiveSection('menu')} />;
      default:
        return (
          <div className="space-y-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveSection('cadastro')}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Plus className="h-5 w-5 text-primary" />
                  </div>
                  Cadastrar Descarte
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Registre descartes realizados pelos usuários e atribua pontos
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveSection('pontos')}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  Pontos de Coleta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Visualize e gerencie os pontos de coleta disponíveis
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveSection('relatorios')}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-orange-600" />
                  </div>
                  Relatórios de Descarte
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Consulte relatórios detalhados dos descartes realizados
                </p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setActiveSection('ranking')}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                  </div>
                  Ranking de Funcionários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Veja o ranking dos funcionários com mais descartes registrados
                </p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={handleBackToHome}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Área do Funcionário</h1>
              <p className="text-sm text-gray-600">Painel administrativo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default AreaFuncionario;
