
import { useState } from "react";
import EcoHeader from "@/components/EcoHeader";
import NavBar from "@/components/NavBar";
import EcoButton from "@/components/EcoButton";
import { Trash2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type WasteType = {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  examples: string;
};

const DescarteResiduo = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const wasteTypes: WasteType[] = [
    {
      id: "paper",
      name: "Papel/Papelão",
      icon: <Trash2 size={24} />,
      color: "bg-blue-500",
      examples: "Jornais, revistas, caixas, embalagens de papel"
    },
    {
      id: "plastic",
      name: "Plástico",
      icon: <Trash2 size={24} />,
      color: "bg-red-500",
      examples: "Garrafas, embalagens, sacolas plásticas"
    },
    {
      id: "glass",
      name: "Vidro",
      icon: <Trash2 size={24} />,
      color: "bg-green-500",
      examples: "Garrafas, potes, frascos"
    },
    {
      id: "metal",
      name: "Metal",
      icon: <Trash2 size={24} />,
      color: "bg-yellow-500",
      examples: "Latas de alumínio, tampas, embalagens metálicas"
    },
    {
      id: "organic",
      name: "Orgânico",
      icon: <Trash2 size={24} />,
      color: "bg-secondary",
      examples: "Restos de alimentos, cascas de frutas e legumes"
    },
    {
      id: "electronic",
      name: "Eletrônico",
      icon: <Trash2 size={24} />,
      color: "bg-orange-500",
      examples: "Pilhas, baterias, celulares, computadores"
    },
    {
      id: "hazardous",
      name: "Perigoso",
      icon: <Trash2 size={24} />,
      color: "bg-danger",
      examples: "Produtos químicos, medicamentos vencidos"
    }
  ];
  
  const handleDiscard = () => {
    if (!selectedType) return;
    
    // In a real app, this would send data to backend
    toast({
      title: "Descarte registrado!",
      description: "Você ganhou 15 pontos pela ação sustentável.",
      duration: 5000,
    });
    
    setSelectedType(null);
    setIsDialogOpen(false);
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
              <div className={`${type.color} text-white p-3 rounded-full mb-2`}>
                {type.icon}
              </div>
              <h3 className="font-medium text-sm">{type.name}</h3>
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
