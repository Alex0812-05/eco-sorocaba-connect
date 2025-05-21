
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { WasteType } from "@/components/waste/WasteData";
import { useNavigate } from "react-router-dom";

export const useWasteDisposal = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "",
    points: 0,
    correctDisposals: 0,
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  // Verificar se o usuário está logado
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    
    if (!userJson) {
      toast({
        title: "Não autenticado",
        description: "Você precisa fazer login para continuar.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    try {
      const user = JSON.parse(userJson);
      setUserInfo({
        id: user.id,
        points: user.points || 0,
        correctDisposals: user.correctDisposals || 0,
      });
    } catch (error) {
      console.error("Erro ao parsear dados do usuário:", error);
      navigate("/login");
    }
  }, [navigate, toast]);

  // Buscar informações do usuário ao carregar o componente
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userInfo.id) return;
      
      try {
        // Buscar dados atualizados do usuário
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userInfo.id)
          .single();
          
        if (error) {
          console.error('Erro ao buscar usuário:', error);
          return;
        }
        
        if (data) {
          setUserInfo({
            id: data.id,
            points: data.points || 0,
            correctDisposals: data.correct_disposals || 0,
          });
          
          // Atualizar os dados do usuário no localStorage
          const userJson = localStorage.getItem("user");
          if (userJson) {
            const user = JSON.parse(userJson);
            user.points = data.points || 0;
            user.correctDisposals = data.correct_disposals || 0;
            localStorage.setItem("user", JSON.stringify(user));
          }
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    };
    
    fetchUserInfo();
  }, [userInfo.id]);

  const handleDiscard = async (wasteType: WasteType) => {
    if (!userInfo.id) {
      toast({
        title: "Não autenticado",
        description: "Você precisa fazer login para continuar.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
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
      
      // Atualizar os dados do usuário no localStorage
      const userJson = localStorage.getItem("user");
      if (userJson) {
        const user = JSON.parse(userJson);
        user.points = newPoints;
        user.correctDisposals = newDisposals;
        localStorage.setItem("user", JSON.stringify(user));
      }
      
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
