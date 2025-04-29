
import EcoHeader from "@/components/EcoHeader";
import NavBar from "@/components/NavBar";
import { Leaf, Recycle, Trash2, BatteryCharging, Apple, Lightbulb } from "lucide-react";

const EducacaoAmbiental = () => {
  const tips = [
    {
      title: "Reciclagem de Plásticos",
      description: "Lave embalagens plásticas antes de descartar e remova rótulos quando possível.",
      icon: <Recycle size={32} className="text-primary" />,
      color: "bg-blue-50"
    },
    {
      title: "Eletrônicos",
      description: "Nunca jogue pilhas ou baterias no lixo comum. Use pontos de coleta específicos.",
      icon: <BatteryCharging size={32} className="text-primary" />,
      color: "bg-yellow-50"
    },
    {
      title: "Orgânicos",
      description: "Restos de alimentos podem ser compostados para produzir adubo natural.",
      icon: <Apple size={32} className="text-primary" />,
      color: "bg-green-50"
    },
    {
      title: "Lixo Comum",
      description: "Separe corretamente o lixo não reciclável para o descarte adequado.",
      icon: <Trash2 size={32} className="text-primary" />,
      color: "bg-red-50"
    },
    {
      title: "Dica Sustentável",
      description: "Use sacolas reutilizáveis para compras e evite embalagens desnecessárias.",
      icon: <Leaf size={32} className="text-primary" />,
      color: "bg-green-100"
    },
    {
      title: "Economize energia",
      description: "Troque lâmpadas por modelos LED que consomem menos energia e duram mais.",
      icon: <Lightbulb size={32} className="text-primary" />,
      color: "bg-orange-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <EcoHeader title="Educação Ambiental" />
      
      <div className="p-4">
        <div className="bg-primary rounded-xl p-5 mb-6 text-white">
          <h2 className="text-xl font-medium mb-2">Importância da separação correta</h2>
          <p className="text-white text-opacity-90">
            Separar corretamente os resíduos aumenta a eficiência da reciclagem e reduz o impacto ambiental. 
            Aprenda com nossas dicas como descartar cada tipo de material.
          </p>
        </div>
        
        <h3 className="text-lg font-medium mb-3">Dicas de descarte</h3>
        
        <div className="flex flex-col gap-4">
          {tips.map((tip, index) => (
            <div 
              key={index}
              className={`${tip.color} p-4 rounded-xl animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex gap-3">
                <div className="mt-1">{tip.icon}</div>
                <div>
                  <h4 className="font-medium">{tip.title}</h4>
                  <p className="text-sm text-gray-700 mt-1">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-secondary bg-opacity-10 p-4 rounded-xl">
          <h3 className="font-medium text-secondary">Sabia?</h3>
          <p className="text-sm mt-1">
            Até 2025, a FACENS Sorocaba pretende reduzir em 50% o desperdício de materiais recicláveis em seu campus.
            Junte-se a esta iniciativa!
          </p>
        </div>
      </div>
      
      <NavBar />
    </div>
  );
};

export default EducacaoAmbiental;
