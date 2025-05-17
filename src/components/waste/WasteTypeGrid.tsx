
import React from "react";
import WasteTypeButton, { WasteType } from "./WasteTypeButton";

interface WasteTypeGridProps {
  wasteTypes: WasteType[];
  selectedType: string | null;
  onTypeSelect: (typeId: string) => void;
}

const WasteTypeGrid = ({ wasteTypes, selectedType, onTypeSelect }: WasteTypeGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {wasteTypes.map((type) => (
        <WasteTypeButton
          key={type.id}
          wasteType={type}
          isSelected={selectedType === type.id}
          onClick={() => onTypeSelect(type.id)}
        />
      ))}
    </div>
  );
};

export default WasteTypeGrid;
