
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { WasteType } from "@/components/waste/WasteData";
import { useUserProfile } from "@/hooks/useUserProfile";

export const useWasteDisposalWithProfiles = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { currentProfile, updateProfile } = useUserProfile();
  const { toast } = useToast();

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
      console.log('Iniciando descarte para perfil:', currentProfile.id);
      
      // Record waste disposal
      const { error: disposalError } = await supabase
        .from('waste_disposals')
        .insert([{
          profile_id: currentProfile.id,
          waste_type: wasteType.id,
          points_earned: pointsEarned
        }]);

      if (disposalError) {
        console.error('Erro ao registrar descarte:', disposalError);
        handleLocalDiscard(pointsEarned);
        return;
      }

      // Update profile points
      const newPoints = currentProfile.points + pointsEarned;
      const newDisposals = currentProfile.correct_disposals + 1;

      console.log('Atualizando pontos:', {
        pontos_antigos: currentProfile.points,
        pontos_ganhos: pointsEarned,
        pontos_novos: newPoints
      });

      // Update the profile in the database
      await updateProfile({
        points: newPoints,
        correct_disposals: newDisposals
      });
      
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
    if (!currentProfile) return;
    
    // Fallback to local storage handling
    const newPoints = currentProfile.points + pointsEarned;
    const newDisposals = currentProfile.correct_disposals + 1;
    
    console.log('Fallback local - atualizando pontos:', {
      pontos_antigos: currentProfile.points,
      pontos_ganhos: pointsEarned,
      pontos_novos: newPoints
    });
    
    // Update via the useUserProfile hook
    updateProfile({
      points: newPoints,
      correct_disposals: newDisposals
    });
    
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
