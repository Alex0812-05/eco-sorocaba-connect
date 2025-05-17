
import React from "react";
import { Check } from "lucide-react";
import EcoButton from "@/components/EcoButton";
import { WasteType } from "./WasteTypeButton";

interface ConfirmationDialogProps {
  wasteType: WasteType;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog = ({ wasteType, onConfirm, onCancel }: ConfirmationDialogProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-5 w-full max-w-sm animate-fade-in">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full text-primary">
            <Check size={32} />
          </div>
        </div>
        <h3 className="text-lg font-medium text-center mb-2">
          Confirmar Descarte
        </h3>
        <p className="text-gray-600 text-center mb-6">
          Você está prestes a registrar o descarte de {" "}
          <span className="font-medium">
            {wasteType.name.toLowerCase()}
          </span>
          . Confirma esta ação?
        </p>
        <div className="flex gap-3">
          <EcoButton 
            variant="outline" 
            onClick={onCancel}
            isFullWidth
          >
            Cancelar
          </EcoButton>
          <EcoButton 
            onClick={onConfirm}
            isFullWidth
          >
            Confirmar
          </EcoButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
