
import { BookOpen, MapPin, Trash2, ChartBar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EcoButton from "@/components/EcoButton";
import Logo from "@/components/Logo";

const Onboarding = () => {
  const navigate = useNavigate();
  
  const sections = [
    { 
      title: "Educação Ambiental", 
      description: "Dicas simples e visuais sobre descarte correto do lixo e sustentabilidade.",
      icon: <BookOpen size={40} />,
      path: "/educacao"
    },
    { 
      title: "Pontos de Coleta", 
      description: "Mapa interativo da FACENS SOROCABA com pontos de descarte.",
      icon: <MapPin size={40} />,
      path: "/coleta"
    },
    { 
      title: "Descarte de Lixo", 
      description: "Escolha o tipo de lixo que deseja descartar corretamente.",
      icon: <Trash2 size={40} />,
      path: "/descarte" 
    },
    { 
      title: "Relatório e Pontuação", 
      description: "Estatísticas do descarte e sua pontuação acumulada.",
      icon: <ChartBar size={40} />,
      path: "/estatisticas"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 flex flex-col">
      <div className="flex flex-col items-center mb-10 animate-fade-in">
        <div className="bg-primary rounded-full p-6 mb-4">
          <img 
            src="/public/lovable-uploads/85ff4149-89f6-4c10-94ff-c436f6800e69.png" 
            alt="SeleCollect Logo" 
            className="h-12 w-12" 
          />
        </div>
        <h1 className="text-3xl font-bold text-center">SeleCollect</h1>
        <p className="text-gray-600 text-center mt-2">
          Sustentabilidade e descarte correto ao seu alcance
        </p>
      </div>
      
      <div className="flex flex-col gap-4 my-6">
        {sections.map((section, index) => (
          <button
            key={section.path}
            onClick={() => navigate(section.path)}
            className="bg-white p-5 rounded-xl shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-primary mt-1">{section.icon}</div>
            <div className="text-left">
              <h3 className="font-medium text-lg">{section.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{section.description}</p>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-auto">
        <EcoButton 
          onClick={() => navigate("/")} 
          isFullWidth 
          size="lg"
        >
          Começar
        </EcoButton>
      </div>
    </div>
  );
};

export default Onboarding;
