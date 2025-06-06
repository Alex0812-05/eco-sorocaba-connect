
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, RotateCcw } from 'lucide-react';
import { useUserProfile } from '@/hooks/useUserProfile';

const ProfileSwitcher = () => {
  const { userType, switchProfile, resetToUserTypeSelection } = useUserProfile();

  if (!userType) return null;

  const currentProfileName = userType === 'funcionario' ? 'Funcionário' : 'Aluno';
  const otherProfileType = userType === 'funcionario' ? 'aluno' : 'funcionario';
  const otherProfileName = userType === 'funcionario' ? 'Aluno' : 'Funcionário';

  return (
    <div className="flex items-center gap-2">
      <div className="text-sm text-gray-600">
        Perfil: <span className="font-medium">{currentProfileName}</span>
      </div>
      
      <Button
        onClick={() => switchProfile(otherProfileType)}
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
      >
        {otherProfileType === 'funcionario' ? <Users size={14} /> : <GraduationCap size={14} />}
        {otherProfileName}
      </Button>
      
      <Button
        onClick={resetToUserTypeSelection}
        variant="ghost"
        size="sm"
        title="Voltar à seleção de perfil"
      >
        <RotateCcw size={14} />
      </Button>
    </div>
  );
};

export default ProfileSwitcher;
