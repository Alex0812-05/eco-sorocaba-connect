
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import EducacaoAmbiental from "./pages/EducacaoAmbiental";
import PontosColeta from "./pages/PontosColeta";
import DescarteResiduo from "./pages/DescarteResiduo";
import Estatisticas from "./pages/Estatisticas";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/educacao" element={<EducacaoAmbiental />} />
          <Route path="/coleta" element={<PontosColeta />} />
          <Route path="/descarte" element={<DescarteResiduo />} />
          <Route path="/estatisticas" element={<Estatisticas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
