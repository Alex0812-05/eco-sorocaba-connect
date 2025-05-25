
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap } from 'lucide-react';
import Logo from '@/components/Logo';

interface UserTypeSelectorProps {
  onSelect: (type: string) => void;
}

const UserTypeSelector = ({ onSelect }: UserTypeSelectorProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo ao SeleCollect</h1>
          <p className="text-gray-600">Sustentabilidade ao seu alcance</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-medium text-center mb-6">Como você gostaria de acessar?</h2>
          
          <Button
            onClick={() => onSelect('aluno')}
            className="w-full h-16 flex items-center justify-center gap-3 text-lg"
            variant="outline"
          >
            <GraduationCap size={24} />
            Sou Aluno
          </Button>

          <Button
            onClick={() => onSelect('funcionario')}
            className="w-full h-16 flex items-center justify-center gap-3 text-lg"
          >
            <Users size={24} />
            Sou Funcionário
          </Button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Você pode alterar essa opção a qualquer momento
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelector;
