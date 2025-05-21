
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, RotateCcw } from "lucide-react";

const ResetPoints = ({ userId, onReset }: { userId: string, onReset: () => void }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleResetPoints = async () => {
    setLoading(true);
    try {
      // Chama a função RPC para resetar os pontos do usuário
      const { error } = await supabase.rpc('reset_user_points', {
        user_id: userId
      });

      if (error) throw error;

      toast({
        title: "Pontos resetados",
        description: "Os pontos do usuário foram resetados com sucesso.",
      });

      onReset();
    } catch (error: any) {
      console.error("Erro ao resetar pontos:", error);
      toast({
        title: "Erro ao resetar pontos",
        description: error.message || "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setDialogOpen(false);
    }
  };

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <RotateCcw size={16} />
          Resetar Pontos
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Resetar Pontos</AlertDialogTitle>
          <AlertDialogDescription>
            Isso irá zerar a pontuação e o contador de descartes corretos. Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleResetPoints} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando
              </>
            ) : (
              "Confirmar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResetPoints;
