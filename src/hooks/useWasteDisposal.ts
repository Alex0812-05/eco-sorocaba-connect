
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { WasteType } from "@/components/waste/WasteData";

export const useWasteDisposal = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "",
    points: 0,
    correctDisposals: 0,
  });
  const { toast } = useToast();

  // Buscar informações do usuário ao carregar o componente
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Por enquanto, vamos buscar o usuário padrão que criamos
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .limit(1)
          .single();
          
        if (error) {
          console.error('Erro ao buscar usuário:', error);
          return;
        }
        
        if (data) {
          setUserInfo({
            id: data.id,
            points: data.points,
            correctDisposals: data.correct_disposals,
          });
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    };
    
    fetchUserInfo();
  }, []);

  const handleDiscard = async (wasteType: WasteType) => {
    if (!userInfo.id) return;
    
    const pointsEarned = wasteType.points;
    
    try {
      // Registrar o descarte
      const { error: disposalError } = await supabase
        .from('waste_disposals')
        .insert({
          user_id: userInfo.id,
          waste_type: wasteType.id,
          points_earned: pointsEarned
        });
        
      if (disposalError) {
        console.error('Erro ao registrar descarte:', disposalError);
        toast({
          title: "Erro ao registrar descarte",
          description: "Ocorreu um erro ao salvar seu descarte. Tente novamente.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }
      
      // Atualizar os pontos do usuário
      const newPoints = userInfo.points + pointsEarned;
      const newDisposals = userInfo.correctDisposals + 1;
      
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          points: newPoints,
          correct_disposals: newDisposals,
          updated_at: new Date().toISOString()
        })
        .eq('id', userInfo.id);
        
      if (updateError) {
        console.error('Erro ao atualizar pontos:', updateError);
        toast({
          title: "Erro ao atualizar pontos",
          description: "Ocorreu um erro ao atualizar sua pontuação. Tente novamente.",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }
      
      // Atualizar estado local
      setUserInfo(prev => ({
        ...prev,
        points: newPoints,
        correctDisposals: newDisposals
      }));
      
      toast({
        title: "Descarte registrado!",
        description: `Você ganhou ${pointsEarned} pontos pela ação sustentável.`,
        duration: 5000,
      });
      
      setSelectedType(null);
      setIsDialogOpen(false);
      
    } catch (error) {
      console.error('Erro geral:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return {
    selectedType,
    setSelectedType,
    isDialogOpen,
    setIsDialogOpen,
    userInfo,
    handleDiscard
  };
};
