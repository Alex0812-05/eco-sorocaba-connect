
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

const staffLoginSchema = z.object({
  ra: z.string().min(1, "RA é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type StaffLoginFormValues = z.infer<typeof staffLoginSchema>;

interface StaffLoginProps {
  onLoginSuccess: () => void;
}

const StaffLogin = ({ onLoginSuccess }: StaffLoginProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<StaffLoginFormValues>({
    resolver: zodResolver(staffLoginSchema),
    defaultValues: {
      ra: "249098", // Default staff RA
      password: "1234",
    },
  });

  const onSubmit = async (values: StaffLoginFormValues) => {
    setLoading(true);
    try {
      // Login
      const { data, error } = await supabase
        .from("auth_credentials")
        .select("*, users:user_id(*)")
        .eq("email", values.ra)
        .eq("password", values.password)
        .single();

      if (error || !data) {
        throw new Error("Credenciais inválidas");
      }

      // Verificar se o tipo de usuário corresponde
      if (data.users.user_type !== "funcionario") {
        throw new Error(`Acesso negado. Este login é exclusivo para funcionários.`);
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

      onLoginSuccess();
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
      <h2 className="text-xl font-medium mb-4">Área do Funcionário</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="ra"
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

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Aguarde
              </>
            ) : (
              "Entrar como Funcionário"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StaffLogin;
