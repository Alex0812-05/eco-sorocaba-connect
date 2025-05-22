
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, MapPin, Trash2, ChartBar } from 'lucide-react';
import EcoCard from '@/components/EcoCard';

const SectionGrid = () => {
  const navigate = useNavigate();
  
  const sections = [
    { 
      title: "Educação Ambiental", 
      description: "Aprenda sobre o descarte correto",
      icon: <BookOpen size={36} />,
      path: "/educacao",
      color: "bg-green-50" 
    },
    { 
      title: "Pontos de Coleta", 
      description: "Encontre locais de descarte",
      icon: <MapPin size={36} />,
      path: "/coleta",
      color: "bg-blue-50"
    },
    { 
      title: "Descarte de Lixo", 
      description: "Registre seu descarte",
      icon: <Trash2 size={36} />,
      path: "/descarte",
      color: "bg-yellow-50"
    },
    { 
      title: "Estatísticas", 
      description: "Acompanhe seu progresso",
      icon: <ChartBar size={36} />,
      path: "/estatisticas",
      color: "bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {sections.map((section) => (
        <EcoCard
          key={section.path}
          title={section.title}
          description={section.description}
          icon={section.icon}
          onClick={() => navigate(section.path)}
          className={`${section.color}`}
        />
      ))}
    </div>
  );
};

export default SectionGrid;
