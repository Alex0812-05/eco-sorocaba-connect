
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import EcoCard from "@/components/EcoCard";
import Logo from "@/components/Logo";
import { BookOpen, MapPin, Trash2, ChartBar, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    name: "Usuário",
    points: 0,
    correctDisposals: 0,
    badges: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
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
          setUserData({
            name: data.name || "Usuário",
            points: data.points || 0,
            correctDisposals: data.correct_disposals || 0,
            badges: data.badges || 0,
          });
        }
      } catch (error) {
        console.error('Erro:', error);
      }
    };
    
    fetchUserData();
  }, []);

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

  const openOnboarding = () => {
    navigate("/onboarding");
  };

  useEffect(() => {
    // On first visit, redirect to onboarding
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      localStorage.setItem('hasVisitedBefore', 'true');
      openOnboarding();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-primary text-white p-6 pt-12 rounded-b-3xl shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Olá, {userData.name}!</h1>
            <p className="opacity-90 mt-1">Bem-vindo ao SeleCollect</p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <img 
              src="/public/lovable-uploads/85ff4149-89f6-4c10-94ff-c436f6800e69.png" 
              alt="SeleCollect Logo" 
              className="h-10 w-10" 
            />
          </div>
        </div>
        
        <div className="mt-6 bg-white bg-opacity-10 p-4 rounded-xl">
          <div className="flex justify-between">
            <div>
              <p className="text-sm opacity-90">Pontuação</p>
              <p className="text-2xl font-bold">{userData.points} pts</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Descartes corretos</p>
              <p className="text-2xl font-bold">{userData.correctDisposals}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Badges</p>
              <p className="text-2xl font-bold">{userData.badges}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-4 mt-6">
        <h2 className="text-xl font-medium mb-4">Escolha uma opção</h2>
        
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
        
        {/* Today's tip */}
        <div className="mt-8 bg-secondary bg-opacity-10 p-4 rounded-xl">
          <h3 className="font-medium text-secondary">Dica do dia</h3>
          <p className="text-sm mt-1">
            Sabia que garrafas PET levam mais de 450 anos para se decompor? Sempre deposite-as nos pontos de coleta seletiva!
          </p>
        </div>
      </div>

      <NavBar />
    </div>
  );
};

export default Index;
