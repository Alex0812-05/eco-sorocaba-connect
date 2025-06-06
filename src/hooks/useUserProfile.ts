import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  user_base_id: string;
  profile_type: 'aluno' | 'funcionario';
  points: number;
  correct_disposals: number;
  badges: number;
  name: string;
  email?: string;
}

export const useUserProfile = () => {
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  const [userBaseId, setUserBaseId] = useState<string>("");
  const [userType, setUserType] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get user type and base ID from localStorage
    const savedUserType = localStorage.getItem('userType');
    let baseId = localStorage.getItem('userBaseId');
    
    if (!baseId) {
      // Generate a unique base ID for this device/session
      baseId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('userBaseId', baseId);
    }
    
    setUserBaseId(baseId);
    setUserType(savedUserType);
    
    if (savedUserType && baseId) {
      loadUserProfile(baseId, savedUserType);
    }
  }, []);

  const loadUserProfile = async (baseId: string, profileType: string) => {
    try {
      // First try to get existing profile
      const { data: existingProfile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_base_id', baseId)
        .eq('profile_type', profileType)
        .single();

      if (existingProfile) {
        setCurrentProfile(existingProfile);
        // Update localStorage with current profile data
        localStorage.setItem('user', JSON.stringify({
          id: existingProfile.id,
          name: existingProfile.name,
          userType: profileType,
          points: existingProfile.points,
          correctDisposals: existingProfile.correct_disposals,
          badges: existingProfile.badges
        }));
      } else {
        // Create new profile if doesn't exist
        await createUserProfile(baseId, profileType);
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      // Fallback to localStorage for offline functionality
      createLocalProfile(baseId, profileType);
    }
  };

  const createUserProfile = async (baseId: string, profileType: string) => {
    try {
      const newProfile = {
        user_base_id: baseId,
        profile_type: profileType,
        name: profileType === 'funcionario' ? 'Funcionário' : 'Aluno',
        points: 0,
        correct_disposals: 0,
        badges: 0
      };

      const { data, error } = await supabase
        .from('user_profiles')
        .insert([newProfile])
        .select()
        .single();

      if (error) throw error;

      setCurrentProfile(data);
      localStorage.setItem('user', JSON.stringify({
        id: data.id,
        name: data.name,
        userType: profileType,
        points: data.points,
        correctDisposals: data.correct_disposals,
        badges: data.badges
      }));
    } catch (error) {
      console.error('Erro ao criar perfil:', error);
      createLocalProfile(baseId, profileType);
    }
  };

  const createLocalProfile = (baseId: string, profileType: string) => {
    const localProfile: UserProfile = {
      id: `${baseId}_${profileType}`,
      user_base_id: baseId,
      profile_type: profileType as 'aluno' | 'funcionario',
      name: profileType === 'funcionario' ? 'Funcionário' : 'Aluno',
      points: 0,
      correct_disposals: 0,
      badges: 0
    };

    setCurrentProfile(localProfile);
    localStorage.setItem('user', JSON.stringify({
      id: localProfile.id,
      name: localProfile.name,
      userType: profileType,
      points: localProfile.points,
      correctDisposals: localProfile.correct_disposals,
      badges: localProfile.badges
    }));
  };

  const switchProfile = async (newProfileType: string) => {
    localStorage.setItem('userType', newProfileType);
    setUserType(newProfileType);
    
    if (userBaseId) {
      await loadUserProfile(userBaseId, newProfileType);
    }
    
    toast({
      title: "Perfil alterado",
      description: `Agora você está acessando como ${newProfileType === 'funcionario' ? 'Funcionário' : 'Aluno'}`,
    });
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!currentProfile) return;

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', currentProfile.id)
        .select()
        .single();

      if (error) throw error;

      setCurrentProfile(data);
      
      // Update localStorage
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({
        ...userData,
        points: data.points,
        correctDisposals: data.correct_disposals,
        badges: data.badges
      }));
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      // Update locally if database fails
      const updatedProfile = { ...currentProfile, ...updates };
      setCurrentProfile(updatedProfile);
      
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({
        ...userData,
        points: updatedProfile.points,
        correctDisposals: updatedProfile.correct_disposals,
        badges: updatedProfile.badges
      }));
    }
  };

  const resetToUserTypeSelection = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
    // Keep userBaseId to maintain profile continuity
    setUserType(null);
    setCurrentProfile(null);
    window.location.reload();
  };

  return {
    currentProfile,
    userType,
    switchProfile,
    updateProfile,
    resetToUserTypeSelection,
    loadUserProfile: (profileType: string) => loadUserProfile(userBaseId, profileType)
  };
};
