
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const studentLoginSchema = z.object({
  email: z.string().min(1, "RA é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type StudentLoginFormValues = z.infer<typeof studentLoginSchema>;

interface StudentLoginProps {
  onLoginSuccess: (userData: any) => void;
  onShowStaffLogin: () => void;
}

const StudentLogin = ({ onLoginSuccess, onShowStaffLogin }: StudentLoginProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<StudentLoginFormValues>({
    resolver: zodResolver(studentLoginSchema),
    defaultValues: {
      email: "240000", // Default student RA
      password: "1234",
    },
  });

  const onSubmit = async (values: StudentLoginFormValues) => {
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
      if (data.users.user_type !== "aluno") {
        throw new Error(`Tipo de usuário incorreto. Você é um ${data.users.user_type}`);
      }

      // Armazenar dados do usuário na sessão
      const userData = {
        id: data.user_id,
        name: data.users.name,
        email: data.email,
        userType: data.users.user_type,
        points: data.users.points,
        correctDisposals: data.users.correct_disposals,
        badges: data.users.badges,
      };
      
      localStorage.setItem("user", JSON.stringify(userData));

      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo ${data.users.name}!`,
      });

      onLoginSuccess(userData);
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

  return (
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
          onClick={onShowStaffLogin}
          className="text-primary hover:underline text-sm"
        >
          Entrar como funcionário
        </button>
      </div>
    </div>
  );
};

export default StudentLogin;
