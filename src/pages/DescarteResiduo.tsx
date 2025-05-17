
import { useState, useEffect } from "react";
import EcoHeader from "@/components/EcoHeader";
import NavBar from "@/components/NavBar";
import EcoButton from "@/components/EcoButton";
import { Trash2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type WasteType = {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  examples: string;
  points: number;
  backgroundColor: string;
};

const DescarteResiduo = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: "",
    points: 0,
    correctDisposals: 0,
  });
  const { toast } = useToast();
  
  const wasteTypes: WasteType[] = [
    {
      id: "paper",
      name: "Papel/Papelão",
      icon: <Trash2 size={24} className="text-white" />,
      color: "bg-blue-500",
      backgroundColor: "bg-[#F2FCE2]",
      examples: "Jornais, revistas, caixas, embalagens de papel",
      points: 10
    },
    {
      id: "plastic",
      name: "Plástico",
      icon: <Trash2 size={24} className="text-white" />,
      color: "bg-red-500",
      backgroundColor: "bg-[#F2FCE2]",
      examples: "Garrafas, embalagens, sacolas plásticas",
      points: 15
    },
    {
      id: "glass",
      name: "Vidro",
      icon: <Trash2 size={24} className="text-white" />,
      color: "bg-green-500",
      backgroundColor: "bg-[#F2FCE2]",
      examples: "Garrafas, potes, frascos",
      points: 20
    },
    {
      id: "metal",
      name: "Metal",
      icon: <Trash2 size={24} className="text-white" />,
      color: "bg-yellow-500",
      backgroundColor: "bg-[#F2FCE2]",
      examples: "Latas de alumínio, tampas, embalagens metálicas",
      points: 25
    },
    {
      id: "organic",
      name: "Orgânico",
      icon: <Trash2 size={24} className="text-white" />,
      color: "bg-secondary",
      backgroundColor: "bg-[#F2FCE2]",
      examples: "Restos de alimentos, cascas de frutas e legumes",
      points: 5
    },
    {
      id: "electronic",
      name: "Eletrônico",
      icon: <Trash2 size={24} className="text-white" />,
      color: "bg-orange-500",
      backgroundColor: "bg-[#F2FCE2]",
      examples: "Pilhas, baterias, celulares, computadores",
      points: 30
    },
    {
      id: "hazardous",
      name: "Perigoso",
      icon: <Trash2 size={24} className="text-white" />,
      color: "bg-danger",
      backgroundColor: "bg-[#F2FCE2]",
      examples: "Produtos químicos, medicamentos vencidos",
      points: 15
    }
  ];
  
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
  
  const handleDiscard = async () => {
    if (!selectedType || !userInfo.id) return;
    
    const wasteType = wasteTypes.find(type => type.id === selectedType);
    if (!wasteType) return;
    
    const pointsEarned = wasteType.points;
    
    try {
      // Registrar o descarte
      const { error: disposalError } = await supabase
        .from('waste_disposals')
        .insert({
          user_id: userInfo.id,
          waste_type: selectedType,
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <EcoHeader title="Descarte de Resíduos" />
      
      <div className="p-4">
        <div className="bg-primary rounded-xl p-5 mb-6 text-white">
          <h2 className="text-xl font-medium mb-2">Descarte Sustentável</h2>
          <p className="text-white text-opacity-90">
            Selecione o tipo de resíduo que você deseja descartar para registrar 
            e receber pontos pela sua ação sustentável.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {wasteTypes.map((type) => (
            <button
              key={type.id}
              className={`p-4 rounded-xl flex flex-col items-center transition-all ${
                selectedType === type.id 
                  ? "bg-accent bg-opacity-20 border-2 border-accent" 
                  : "bg-white border border-gray-100"
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              {/* Círculo com fundo bege claro (#F2FCE2) e ícone colorido */}
              <div className={`${type.backgroundColor} rounded-full p-3 mb-2 flex items-center justify-center`}>
                <div className={`text-${type.color.substring(3)}`}>
                  <Trash2 size={24} />
                </div>
              </div>
              <h3 className="font-medium text-sm">{type.name}</h3>
              <p className="text-xs text-primary mt-1">{type.points} pts</p>
            </button>
          ))}
        </div>
        
        {selectedType && (
          <div className="bg-white rounded-xl p-4 shadow-sm animate-fade-in">
            <h3 className="font-medium mb-2">
              {wasteTypes.find((t) => t.id === selectedType)?.name}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-medium">Exemplos: </span>
              {wasteTypes.find((t) => t.id === selectedType)?.examples}
            </p>
            <EcoButton 
              onClick={() => setIsDialogOpen(true)}
              isFullWidth
              icon={<Trash2 size={18} />}
            >
              Registrar Descarte
            </EcoButton>
          </div>
        )}
        
        {/* Tips for proper waste disposal */}
        {!selectedType && (
          <div className="mt-4 bg-secondary bg-opacity-10 p-4 rounded-xl">
            <h3 className="font-medium text-secondary mb-1">Dicas para descarte</h3>
            <ul className="text-sm list-disc list-inside text-gray-700">
              <li className="mb-1">Sempre lave as embalagens antes do descarte</li>
              <li className="mb-1">Separe tampas e rótulos de materiais diferentes</li>
              <li>Eletrônicos devem ir para pontos de coleta específicos</li>
            </ul>
          </div>
        )}
      </div>
      
      {/* Confirmation Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-5 w-full max-w-sm animate-fade-in">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full text-primary">
                <Check size={32} />
              </div>
            </div>
            <h3 className="text-lg font-medium text-center mb-2">
              Confirmar Descarte
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Você está prestes a registrar o descarte de {" "}
              <span className="font-medium">
                {wasteTypes.find((t) => t.id === selectedType)?.name.toLowerCase()}
              </span>
              . Confirma esta ação?
            </p>
            <div className="flex gap-3">
              <EcoButton 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                isFullWidth
              >
                Cancelar
              </EcoButton>
              <EcoButton 
                onClick={handleDiscard}
                isFullWidth
              >
                Confirmar
              </EcoButton>
            </div>
          </div>
        </div>
      )}
      
      <NavBar />
    </div>
  );
};

export default DescarteResiduo;
