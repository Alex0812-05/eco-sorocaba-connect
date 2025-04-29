
import { useState } from "react";
import EcoHeader from "@/components/EcoHeader";
import NavBar from "@/components/NavBar";
import { MapPin, Info } from "lucide-react";
import EcoCard from "@/components/EcoCard";

const PontosColeta = () => {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  // Updated collection points data with FACENS campus buildings
  const collectionPoints = [
    {
      id: 1,
      name: "Bloco A",
      type: "Recicláveis",
      description: "Ponto para papel, plástico, vidro e metal",
      position: { top: "30%", left: "50%" }
    },
    {
      id: 2,
      name: "Bloco B",
      type: "Eletrônicos",
      description: "Ponto para pilhas, baterias e eletrônicos",
      position: { top: "35%", left: "55%" }
    },
    {
      id: 3,
      name: "Bloco C",
      type: "Orgânicos",
      description: "Ponto para resíduos orgânicos",
      position: { top: "40%", left: "45%" }
    },
    {
      id: 4,
      name: "Bloco D",
      type: "Papel",
      description: "Ponto especializado para papel e livros",
      position: { top: "45%", left: "40%" }
    },
    {
      id: 5,
      name: "Bloco E",
      type: "Químicos",
      description: "Ponto para resíduos laboratoriais",
      position: { top: "50%", left: "60%" }
    },
    {
      id: 6,
      name: "Bloco F",
      type: "Recicláveis",
      description: "Ponto para papel, plástico, vidro e metal",
      position: { top: "35%", left: "65%" }
    },
    {
      id: 7,
      name: "Bloco G",
      type: "Eletrônicos",
      description: "Ponto para pilhas, baterias e eletrônicos",
      position: { top: "45%", left: "70%" }
    },
    {
      id: 8,
      name: "Bloco H",
      type: "Orgânicos",
      description: "Ponto para resíduos orgânicos",
      position: { top: "55%", left: "45%" }
    },
    {
      id: 9,
      name: "Bloco I",
      type: "Papel",
      description: "Ponto especializado para papel e livros",
      position: { top: "60%", left: "50%" }
    },
    {
      id: 10,
      name: "Bloco J",
      type: "Químicos",
      description: "Ponto para resíduos laboratoriais",
      position: { top: "65%", left: "55%" }
    },
    {
      id: 11,
      name: "Bloco K",
      type: "Recicláveis",
      description: "Ponto para papel, plástico, vidro e metal",
      position: { top: "55%", left: "60%" }
    },
    {
      id: 12,
      name: "Bloco L",
      type: "Eletrônicos",
      description: "Ponto para pilhas, baterias e eletrônicos",
      position: { top: "70%", left: "60%" }
    },
    {
      id: 13,
      name: "Refeitório",
      type: "Orgânicos",
      description: "Ponto para resíduos orgânicos",
      position: { top: "50%", left: "30%" }
    },
    {
      id: 14,
      name: "Quadra",
      type: "Recicláveis",
      description: "Ponto para garrafas plásticas e embalagens",
      position: { top: "65%", left: "30%" }
    },
    {
      id: 15,
      name: "Biblioteca",
      type: "Papel",
      description: "Ponto especializado para papel e livros",
      position: { top: "40%", left: "35%" }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <EcoHeader title="Pontos de Coleta" />
      
      <div className="p-4">
        <div className="mb-4">
          <p className="text-gray-700">
            Encontre os pontos de coleta disponíveis no campus da FACENS Sorocaba para o descarte correto de resíduos.
          </p>
        </div>
        
        {/* Map container */}
        <div className="relative bg-blue-50 border border-blue-100 h-80 rounded-xl overflow-hidden mb-6">
          {/* Updated to use the uploaded campus image */}
          <div className="w-full h-full">
            <img 
              src="/lovable-uploads/acb32788-60d2-45e1-9da9-0e7125daecb0.png" 
              alt="Mapa do Campus FACENS" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Map pins */}
          {collectionPoints.map((point) => (
            <button
              key={point.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                selectedPoint === point.id ? "z-20" : "z-10"
              }`}
              style={{ top: point.position.top, left: point.position.left }}
              onClick={() => setSelectedPoint(point.id === selectedPoint ? null : point.id)}
            >
              <div className="flex flex-col items-center">
                <MapPin 
                  size={32} 
                  className={`${
                    selectedPoint === point.id 
                      ? "text-accent" 
                      : "text-primary"
                  } drop-shadow-md`}
                  fill={selectedPoint === point.id ? "#F9B368" : "#ffffff"}
                />
                <div className={`text-xs font-medium px-2 py-1 rounded-full bg-white shadow-sm -mt-1 ${
                  selectedPoint === point.id ? "block" : "hidden"
                }`}>
                  {point.name}
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Point details */}
        {selectedPoint && (
          <EcoCard
            title={collectionPoints.find(p => p.id === selectedPoint)?.name || ""}
            description={`Tipo: ${collectionPoints.find(p => p.id === selectedPoint)?.type}`}
            className="mb-4 animate-fade-in"
          >
            <p className="text-gray-600 text-sm mt-3">
              {collectionPoints.find(p => p.id === selectedPoint)?.description}
            </p>
          </EcoCard>
        )}
        
        {/* List view */}
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-3">Lista de Pontos</h3>
          {collectionPoints.map((point) => (
            <div 
              key={point.id}
              className={`p-3 border-l-4 mb-3 rounded-r-lg bg-white ${
                selectedPoint === point.id 
                  ? "border-accent" 
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedPoint(point.id === selectedPoint ? null : point.id)}
            >
              <h4 className="font-medium">{point.name}</h4>
              <p className="text-sm text-gray-600">{point.type}</p>
            </div>
          ))}
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default PontosColeta;
