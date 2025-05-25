
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

  // Get user info from localStorage
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        setUserInfo({
          id: user.id || `user_${Date.now()}`,
          points: user.points || 0,
          correctDisposals: user.correctDisposals || 0,
        });
      } catch (error) {
        console.error("Erro ao parsear dados do usuário:", error);
        // Create a default user if parsing fails
        const defaultUser = {
          id: `user_${Date.now()}`,
          points: 0,
          correctDisposals: 0,
        };
        setUserInfo(defaultUser);
      }
    } else {
      // Create a default user if no user data exists
      const defaultUser = {
        id: `user_${Date.now()}`,
        points: 0,
        correctDisposals: 0,
      };
      setUserInfo(defaultUser);
    }
  }, []);

  const handleDiscard = async (wasteType: WasteType) => {
    const pointsEarned = wasteType.points;
    
    try {
      // For now, we'll just update localStorage since we removed authentication
      const newPoints = userInfo.points + pointsEarned;
      const newDisposals = userInfo.correctDisposals + 1;
      
      // Update local state
      setUserInfo(prev => ({
        ...prev,
        points: newPoints,
        correctDisposals: newDisposals
      }));
      
      // Update localStorage
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
