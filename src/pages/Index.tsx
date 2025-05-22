
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import EcoCard from "@/components/EcoCard";
import { BookOpen, MapPin, Trash2, ChartBar, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ResetPoints from "@/components/admin/ResetPoints";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import StaffLogin from "@/components/StaffLogin";

interface UserData {
  id: string;
  name: string;
  email: string;
  userType: string;
  points: number;
  correctDisposals: number;
  badges: number;
}

const loginSchema = z.object({
  email: z.string().min(1, "RA é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  userType: z.enum(["aluno", "funcionario"]),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showStaffLogin, setShowStaffLogin] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "240000", // Default to student RA
      password: "1234",
      userType: "aluno",
    },
  });

  // Update the default RA based on the selected user type
  useEffect(() => {
    const userType = form.watch("userType");
    if (userType === "aluno") {
      form.setValue("email", "240000");
    } else {
      form.setValue("email", "249098");
    }
  }, [form.watch("userType")]);

  useEffect(() => {
    // Verificar se o usuário está logado
    const userJson = localStorage.getItem("user");
    
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        setUserData(user);
      } catch (error) {
        console.error("Erro ao parse do usuário:", error);
      }
    }
  }, []);

  const fetchUserData = async () => {
    if (!userData?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userData.id)
        .single();
        
      if (error) {
        console.error('Erro ao buscar usuário:', error);
        return;
      }
      
      if (data) {
        // Atualizar os dados do usuário no state e no localStorage
        const updatedUser = {
          ...userData,
          name: data.name,
          points: data.points || 0,
          correctDisposals: data.correct_disposals || 0,
          badges: data.badges || 0,
        };
        
        setUserData(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  useEffect(() => {
    if (userData?.id) {
      fetchUserData();
    }
  }, [userData?.id]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserData(null);
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta com sucesso.",
    });
  };

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      // Login
      const { data, error } = await supabase
        .from("auth_credentials")
        .select("*, users:user_id(*)")
        .eq("email", values.email)
        .eq("password", values.password)
        .single();

      if (error || !data) {
        throw new Error("Credenciais inválidas");
      }

      // Verificar se o tipo de usuário corresponde
      if (data.users.user_type !== values.userType) {
        throw new Error(`Tipo de usuário incorreto. Você é um ${data.users.user_type}`);
      }

      // Armazenar dados do usuário na sessão
      localStorage.setItem("user", JSON.stringify({
        id: data.user_id,
        name: data.users.name,
        email: data.email,
        userType: data.users.user_type,
        points: data.users.points,
        correctDisposals: data.users.correct_disposals,
        badges: data.users.badges,
      }));

      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo ${data.users.name}!`,
      });

      setUserData({
        id: data.user_id,
        name: data.users.name,
        email: data.email,
        userType: data.users.user_type,
        points: data.users.points || 0,
        correctDisposals: data.users.correct_disposals || 0,
        badges: data.users.badges || 0,
      });
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <img
              src="/lovable-uploads/85ff4149-89f6-4c10-94ff-c436f6800e69.png"
              alt="SeleCollect Logo"
              className="h-24 w-24"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-6">
            SeleCollect
          </h1>

          {showStaffLogin ? (
            <div className="space-y-4">
              <StaffLogin onLoginSuccess={() => {
                const userJson = localStorage.getItem("user");
                if (userJson) {
                  try {
                    const user = JSON.parse(userJson);
                    setUserData(user);
                  } catch (error) {
                    console.error("Erro ao parse do usuário:", error);
                  }
                }
              }} />
              <Button 
                variant="link" 
                className="w-full" 
                onClick={() => setShowStaffLogin(false)}
              >
                Voltar para login de aluno
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-medium mb-4">Login de Aluno</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RA</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Seu RA"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="******"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <input type="hidden" name="userType" value="aluno" />

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Aguarde
                      </>
                    ) : (
                      "Entrar como Aluno"
                    )}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowStaffLogin(true)}
                  className="text-primary hover:underline text-sm"
                >
                  Entrar como funcionário
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-primary text-white p-6 pt-12 rounded-b-3xl shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Olá, {userData.name}!</h1>
            <p className="opacity-90 mt-1">
              Bem-vindo ao SeleCollect 
              <span className="ml-1 px-2 py-0.5 bg-white bg-opacity-20 rounded-full text-xs">
                {userData.userType === "aluno" ? "Aluno" : "Funcionário"}
              </span>
            </p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <img 
              src="/lovable-uploads/85ff4149-89f6-4c10-94ff-c436f6800e69.png" 
              alt="SeleCollect Logo" 
              className="h-16 w-16" 
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Escolha uma opção</h2>
          
          <div className="flex gap-2">
            {userData.userType === "funcionario" && (
              <ResetPoints userId={userData.id} onReset={fetchUserData} />
            )}
            
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut size={16} />
              Sair
            </Button>
          </div>
        </div>
        
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
