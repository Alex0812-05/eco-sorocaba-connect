
import React from "react";
import EcoHeader from "@/components/EcoHeader";
import NavBar from "@/components/NavBar";
import WasteTypeGrid from "@/components/waste/WasteTypeGrid";
import WasteDetails from "@/components/waste/WasteDetails";
import WasteTips from "@/components/waste/WasteTips";
import ConfirmationDialog from "@/components/waste/ConfirmationDialog";
import { wasteTypes } from "@/components/waste/WasteData";
import { useWasteDisposal } from "@/hooks/useWasteDisposal";

const DescarteResiduo = () => {
  const {
    selectedType,
    setSelectedType,
    isDialogOpen,
    setIsDialogOpen,
    handleDiscard
  } = useWasteDisposal();

  // Encontra o tipo de resíduo selecionado
  const selectedWasteType = wasteTypes.find(type => type.id === selectedType);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <EcoHeader title="Descarte de Resíduos" />
      
      <div className="p-4">
        <div className="bg-primary rounded-xl p-5 mb-6 text-white">
          <h2 className="text-xl font-medium mb-2">Descarte Sustentável</h2>
          <p className="text-white text-opacity-90">
            Selecione o tipo de resíduo que você deseja descartar para registrar 
            e receber pontos pela sua ação sustentável.
          </p>
        </div>
        
        <WasteTypeGrid 
          wasteTypes={wasteTypes} 
          selectedType={selectedType} 
          onTypeSelect={setSelectedType} 
        />
        
        {selectedWasteType && (
          <WasteDetails 
            wasteType={selectedWasteType} 
            onRegisterClick={() => setIsDialogOpen(true)} 
          />
        )}
        
        {/* Dicas para descarte adequado */}
        {!selectedType && <WasteTips />}
      </div>
      
      {/* Diálogo de Confirmação */}
      {isDialogOpen && selectedWasteType && (
        <ConfirmationDialog 
          wasteType={selectedWasteType}
          onConfirm={() => handleDiscard(selectedWasteType)}
          onCancel={() => setIsDialogOpen(false)}
        />
      )}
      
      <NavBar />
    </div>
  );
};

export default DescarteResiduo;
