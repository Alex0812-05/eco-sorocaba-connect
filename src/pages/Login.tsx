
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().min(1, "RA é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  userType: z.enum(["aluno", "funcionario"]),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "1234", // Pre-filled with "1234"
      password: "1234", // Pre-filled with "1234"
      userType: "aluno",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      if (isRegistering) {
        // Registrar novo usuário
        const { data: userData, error: userError } = await supabase
          .from("users")
          .insert({
            name: values.email,
            email: values.email,
            user_type: values.userType,
          })
          .select();

        if (userError) throw userError;

        // Criar credenciais para o usuário
        const { error: credentialError } = await supabase
          .from("auth_credentials")
          .insert({
            user_id: userData[0].id,
            email: values.email,
            password: values.password, // Nota: Em produção, use hash de senha
          });

        if (credentialError) throw credentialError;

        toast({
          title: "Conta criada com sucesso!",
          description: "Faça login para continuar.",
        });
        
        setIsRegistering(false);
      } else {
        // Login
        const { data, error } = await supabase
          .from("auth_credentials")
          .select("*, users:user_id(*)")
          .eq("email", values.email)
          .eq("password", values.password) // Nota: Em produção, use verificação hash
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

        navigate("/");
      }
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-center mb-6">
          <img
            src="/lovable-uploads/85ff4149-89f6-4c10-94ff-c436f6800e69.png"
            alt="SeleCollect Logo"
            className="h-24 w-24"
          />
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-6">
          {isRegistering ? "Criar Conta" : "Login SeleCollect"}
        </h1>

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

            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipo de Usuário</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="aluno" id="aluno" />
                        <Label htmlFor="aluno">Aluno</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="funcionario" id="funcionario" />
                        <Label htmlFor="funcionario">Funcionário</Label>
                      </div>
                    </RadioGroup>
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
              ) : isRegistering ? (
                "Registrar"
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-primary hover:underline text-sm"
          >
            {isRegistering
              ? "Já possui conta? Entre"
              : "Não possui conta? Registre-se"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
