
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { WasteType } from "@/components/waste/WasteData";

export const useWasteDisposalWithProfiles = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get current profile from localStorage
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        setCurrentProfile(user);
      } catch (error) {
        console.error("Erro ao parsear dados do usuário:", error);
      }
    }
  }, []);

  const handleDiscard = async (wasteType: WasteType) => {
    if (!currentProfile) {
      toast({
        title: "Erro",
        description: "Perfil de usuário não encontrado",
        variant: "destructive",
      });
      return;
    }

    const pointsEarned = wasteType.points;
    
    try {
      // Get user base ID
      const userBaseId = localStorage.getItem('userBaseId');
      const userType = localStorage.getItem('userType');
      
      if (!userBaseId || !userType) {
        throw new Error('Dados de usuário não encontrados');
      }

      // Get current profile from database
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_base_id', userBaseId)
        .eq('profile_type', userType)
        .single();

      if (profileError) {
        console.error('Erro ao buscar perfil:', profileError);
        // Fallback to local handling
        handleLocalDiscard(pointsEarned);
        return;
      }

      // Record waste disposal
      const { error: disposalError } = await supabase
        .from('waste_disposals')
        .insert([{
          profile_id: profile.id,
          user_id: profile.id, // Maintaining compatibility
          waste_type: wasteType.id,
          points_earned: pointsEarned
        }]);

      if (disposalError) {
        console.error('Erro ao registrar descarte:', disposalError);
        handleLocalDiscard(pointsEarned);
        return;
      }

      // Update profile points
      const newPoints = profile.points + pointsEarned;
      const newDisposals = profile.correct_disposals + 1;

      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          points: newPoints,
          correct_disposals: newDisposals,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id);

      if (updateError) {
        console.error('Erro ao atualizar pontos:', updateError);
        handleLocalDiscard(pointsEarned);
        return;
      }

      // Update local state
      const updatedUser = {
        ...currentProfile,
        points: newPoints,
        correctDisposals: newDisposals
      };
      
      setCurrentProfile(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      toast({
        title: "Descarte registrado!",
        description: `Você ganhou ${pointsEarned} pontos pela ação sustentável.`,
        duration: 5000,
      });
      
    } catch (error) {
      console.error('Erro geral:', error);
      handleLocalDiscard(pointsEarned);
    }
    
    setSelectedType(null);
    setIsDialogOpen(false);
  };

  const handleLocalDiscard = (pointsEarned: number) => {
    // Fallback to local storage handling
    const newPoints = currentProfile.points + pointsEarned;
    const newDisposals = currentProfile.correctDisposals + 1;
    
    const updatedUser = {
      ...currentProfile,
      points: newPoints,
      correctDisposals: newDisposals
    };
    
    setCurrentProfile(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    
    toast({
      title: "Descarte registrado!",
      description: `Você ganhou ${pointsEarned} pontos pela ação sustentável.`,
      duration: 5000,
    });
  };

  return {
    selectedType,
    setSelectedType,
    isDialogOpen,
    setIsDialogOpen,
    currentProfile,
    handleDiscard
  };
};
