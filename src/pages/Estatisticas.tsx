
import { useState } from "react";
import EcoHeader from "@/components/EcoHeader";
import NavBar from "@/components/NavBar";
import { Award, TrendingUp, Check } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

// Demo data - in a real app this would come from a backend
const disposalData = [
  { name: "Papel", value: 12, color: "#4299E1" },
  { name: "Plástico", value: 8, color: "#F56565" },
  { name: "Vidro", value: 5, color: "#48BB78" },
  { name: "Metal", value: 3, color: "#ECC94B" },
  { name: "Orgânico", value: 7, color: "#1E8A70" },
  { name: "Eletrônico", value: 2, color: "#ED8936" }
];

const weeklyData = [
  { name: "Seg", disposals: 3 },
  { name: "Ter", disposals: 2 },
  { name: "Qua", disposals: 4 },
  { name: "Qui", disposals: 1 },
  { name: "Sex", disposals: 5 },
  { name: "Sab", disposals: 3 },
  { name: "Dom", disposals: 2 }
];

const achievements = [
  { 
    id: 1, 
    name: "Iniciante Verde", 
    description: "Registrou seus primeiros 5 descartes", 
    completed: true,
    points: 50
  },
  { 
    id: 2, 
    name: "Coletor de Plásticos", 
    description: "Descartou 10 itens plásticos corretamente", 
    completed: true,
    points: 75
  },
  { 
    id: 3, 
    name: "Amigo do Papel", 
    description: "Descartou 15 itens de papel corretamente", 
    completed: false,
    progress: 12,
    total: 15,
    points: 100
  },
  { 
    id: 4, 
    name: "Mestre da Reciclagem", 
    description: "Atingiu 50 descartes corretos no total", 
    completed: false,
    progress: 37,
    total: 50,
    points: 200
  }
];

const Estatisticas = () => {
  const [activeTab, setActiveTab] = useState<"stats" | "achievements">("stats");
  
  // Demo user stats
  const userStats = {
    totalDisposals: 37,
    totalPoints: 125,
    rank: "Reciclador Iniciante",
    level: 2
  };

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
                      data={disposalData}
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
                    Seus descartes corretos ajudaram a evitar aproximadamente 12kg de resíduos em aterros sanitários.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <h3 className="font-medium mb-3">Suas Conquistas</h3>
            
            <div className="flex flex-col gap-3">
              {achievements.map((achievement) => (
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
