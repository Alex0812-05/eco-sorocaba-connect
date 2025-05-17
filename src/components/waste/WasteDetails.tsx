
import React from "react";
import { Trash2 } from "lucide-react";
import EcoButton from "@/components/EcoButton";
import { WasteType } from "./WasteTypeButton";

interface WasteDetailsProps {
  wasteType: WasteType;
  onRegisterClick: () => void;
}

const WasteDetails = ({ wasteType, onRegisterClick }: WasteDetailsProps) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm animate-fade-in">
      <h3 className="font-medium mb-2">{wasteType.name}</h3>
      <p className="text-sm text-gray-600 mb-4">
        <span className="font-medium">Exemplos: </span>
        {wasteType.examples}
      </p>
      <EcoButton 
        onClick={onRegisterClick}
        isFullWidth
        icon={<Trash2 size={18} />}
      >
        Registrar Descarte
      </EcoButton>
    </div>
  );
};

export default WasteDetails;
