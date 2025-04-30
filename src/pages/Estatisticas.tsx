
import { useState, useEffect } from "react";
import EcoHeader from "@/components/EcoHeader";
import NavBar from "@/components/NavBar";
import { Award, TrendingUp, Check } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { supabase } from "@/integrations/supabase/client";

const Estatisticas = () => {
  const [activeTab, setActiveTab] = useState<"stats" | "achievements">("stats");
  const [userStats, setUserStats] = useState({
    totalDisposals: 0,
    totalPoints: 0,
    rank: "Reciclador Iniciante",
    level: 1
  });
  const [disposalData, setDisposalData] = useState([
    { name: "Papel", value: 0, color: "#4299E1" },
    { name: "Plástico", value: 0, color: "#F56565" },
    { name: "Vidro", value: 0, color: "#48BB78" },
    { name: "Metal", value: 0, color: "#ECC94B" },
    { name: "Orgânico", value: 0, color: "#1E8A70" },
    { name: "Eletrônico", value: 0, color: "#ED8936" },
    { name: "Perigoso", value: 0, color: "#E53E3E" }
  ]);
  
  // Dados demo para gráfico semanal e conquistas
  const [weeklyData, setWeeklyData] = useState([
    { name: "Seg", disposals: 0 },
    { name: "Ter", disposals: 0 },
    { name: "Qua", disposals: 0 },
    { name: "Qui", disposals: 0 },
    { name: "Sex", disposals: 0 },
    { name: "Sab", disposals: 0 },
    { name: "Dom", disposals: 0 }
  ]);
  
  const achievements = [
    { 
      id: 1, 
      name: "Iniciante Verde", 
      description: "Registrou seus primeiros 5 descartes", 
      completed: false,
      progress: 0,
      total: 5,
      points: 50
    },
    { 
      id: 2, 
      name: "Coletor de Plásticos", 
      description: "Descartou 10 itens plásticos corretamente", 
      completed: false,
      progress: 0,
      total: 10,
      points: 75
    },
    { 
      id: 3, 
      name: "Amigo do Papel", 
      description: "Descartou 15 itens de papel corretamente", 
      completed: false,
      progress: 0,
      total: 15,
      points: 100
    },
    { 
      id: 4, 
      name: "Mestre da Reciclagem", 
      description: "Atingiu 50 descartes corretos no total", 
      completed: false,
      progress: 0,
      total: 50,
      points: 200
    }
  ];
  
  const [achievementsList, setAchievementsList] = useState(achievements);
  
  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        // Buscar usuário
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .limit(1)
          .single();
          
        if (userError) {
          console.error('Erro ao buscar usuário:', userError);
          return;
        }
        
        if (userData) {
          // Calcular nível com base nos pontos
          const level = Math.floor(userData.points / 100) + 1;
          let rank = "Reciclador Iniciante";
          
          if (userData.points >= 500) rank = "Reciclador Expert";
          else if (userData.points >= 300) rank = "Reciclador Avançado";
          else if (userData.points >= 100) rank = "Reciclador Intermediário";
          
          setUserStats({
            totalDisposals: userData.correct_disposals || 0,
            totalPoints: userData.points || 0,
            rank,
            level
          });
          
          // Buscar descartes
          const { data: disposalsData, error: disposalsError } = await supabase
            .from('waste_disposals')
            .select('*')
            .eq('user_id', userData.id);
            
          if (disposalsError) {
            console.error('Erro ao buscar descartes:', disposalsError);
            return;
          }
          
          if (disposalsData) {
            // Atualizar gráfico de tipos de resíduos
            const typeCountMap: Record<string, number> = {};
            const wasteTypeMap: Record<string, string> = {
              paper: "Papel",
              plastic: "Plástico",
              glass: "Vidro",
              metal: "Metal",
              organic: "Orgânico",
              electronic: "Eletrônico",
              hazardous: "Perigoso"
            };
            
            // Contar descartes por tipo
            disposalsData.forEach(disposal => {
              const typeName = wasteTypeMap[disposal.waste_type] || disposal.waste_type;
              typeCountMap[typeName] = (typeCountMap[typeName] || 0) + 1;
            });
            
            // Atualizar dados do gráfico
            const updatedDisposalData = disposalData.map(item => ({
              ...item,
              value: typeCountMap[item.name] || 0
            }));
            
            setDisposalData(updatedDisposalData);
            
            // Atualizar dados semanais (simplificado - distribuindo aleatoriamente)
            const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
            const today = new Date().getDay();
            
            // Distribuir descartes nos últimos 7 dias com valores mais altos para dias mais recentes
            const tempWeeklyData = [...weeklyData];
            for (let i = 0; i < disposalsData.length && i < 20; i++) {
              const dayIndex = (today - i % 7 + 7) % 7;
              const dayName = weekDays[dayIndex];
              const dayData = tempWeeklyData.find(d => d.name === dayName);
              if (dayData) {
                dayData.disposals += 1;
              }
            }
            
            setWeeklyData(tempWeeklyData);
            
            // Atualizar conquistas
            const paperCount = typeCountMap["Papel"] || 0;
            const plasticCount = typeCountMap["Plástico"] || 0;
            const totalCount = disposalsData.length;
            
            const updatedAchievements = achievements.map(achievement => {
              switch (achievement.id) {
                case 1: // Iniciante Verde
                  return {
                    ...achievement,
                    progress: Math.min(totalCount, achievement.total),
                    completed: totalCount >= achievement.total
                  };
                case 2: // Coletor de Plásticos
                  return {
                    ...achievement,
                    progress: Math.min(plasticCount, achievement.total),
                    completed: plasticCount >= achievement.total
                  };
                case 3: // Amigo do Papel
                  return {
                    ...achievement,
                    progress: Math.min(paperCount, achievement.total),
                    completed: paperCount >= achievement.total
                  };
                case 4: // Mestre da Reciclagem
                  return {
                    ...achievement,
                    progress: Math.min(totalCount, achievement.total),
                    completed: totalCount >= achievement.total
                  };
                default:
                  return achievement;
              }
            });
            
            setAchievementsList(updatedAchievements);
          }
        }
      } catch (error) {
        console.error('Erro geral:', error);
      }
    };
    
    fetchUserStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <EcoHeader title="Estatísticas" />
      
      <div className="p-4">
        {/* User stats summary card */}
        <div className="bg-primary text-white rounded-xl p-5 mb-6">
          <div className="flex justify-between">
            <div>
              <h2 className="text-xl font-medium">{userStats.rank}</h2>
              <p className="text-white text-opacity-90">Nível {userStats.level}</p>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <Award size={28} className="text-white" />
            </div>
          </div>
          
          <div className="flex justify-between mt-4 bg-white bg-opacity-10 p-3 rounded-lg">
            <div>
              <p className="text-sm opacity-90">Total de descartes</p>
              <p className="text-2xl font-bold">{userStats.totalDisposals}</p>
            </div>
            <div>
              <p className="text-sm opacity-90">Pontos acumulados</p>
              <p className="text-2xl font-bold">{userStats.totalPoints}</p>
            </div>
          </div>
        </div>
        
        {/* Tab navigation */}
        <div className="flex mb-4">
          <button 
            className={`flex-1 py-2 text-center font-medium border-b-2 ${
              activeTab === "stats" 
                ? "border-primary text-primary" 
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("stats")}
          >
            Estatísticas
          </button>
          <button 
            className={`flex-1 py-2 text-center font-medium border-b-2 ${
              activeTab === "achievements" 
                ? "border-primary text-primary" 
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("achievements")}
          >
            Conquistas
          </button>
        </div>
        
        {activeTab === "stats" ? (
          <div className="animate-fade-in">
            {/* Pie chart for waste types */}
            <div className="bg-white p-4 rounded-xl mb-4">
              <h3 className="font-medium mb-3">Tipos de Resíduos Descartados</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={disposalData.filter(d => d.value > 0)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {disposalData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Bar chart for weekly activity */}
            <div className="bg-white p-4 rounded-xl">
              <h3 className="font-medium mb-3">Atividade Semanal</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="disposals" fill="#278D44" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mt-4 bg-secondary bg-opacity-10 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <TrendingUp className="text-secondary mt-1" size={22} />
                <div>
                  <h3 className="font-medium text-secondary">Seu Impacto</h3>
                  <p className="text-sm mt-1">
                    Seus descartes corretos ajudaram a evitar aproximadamente {userStats.totalDisposals * 0.3}kg de resíduos em aterros sanitários.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <h3 className="font-medium mb-3">Suas Conquistas</h3>
            
            <div className="flex flex-col gap-3">
              {achievementsList.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-xl border ${
                    achievement.completed 
                      ? "bg-green-50 border-green-200" 
                      : "bg-white border-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">
                      {achievement.name}{" "}
                      <span className="text-primary font-normal text-sm">
                        {achievement.points} pts
                      </span>
                    </h4>
                    {achievement.completed && (
                      <div className="bg-green-500 rounded-full p-1">
                        <Check size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1 mb-2">
                    {achievement.description}
                  </p>
                  
                  {!achievement.completed && achievement.progress !== undefined && (
                    <div>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progresso</span>
                        <span>{achievement.progress}/{achievement.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center py-3 px-4 bg-accent bg-opacity-10 rounded-xl">
              <p className="text-sm text-gray-700">
                Complete mais conquistas para subir de nível e ganhar mais pontos!
              </p>
            </div>
          </div>
        )}
      </div>
      
      <NavBar />
    </div>
  );
};

export default Estatisticas;
