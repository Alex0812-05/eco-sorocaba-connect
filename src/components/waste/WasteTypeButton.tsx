
import React from "react";
import { Trash2 } from "lucide-react";

export interface WasteType {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
  backgroundColor: string;
  examples: string;
  points: number;
}

interface WasteTypeButtonProps {
  wasteType: WasteType;
  isSelected: boolean;
  onClick: () => void;
}

const WasteTypeButton = ({ wasteType, isSelected, onClick }: WasteTypeButtonProps) => {
  return (
    <button
      className={`p-4 rounded-xl flex flex-col items-center transition-all ${
        isSelected
          ? "bg-accent bg-opacity-20 border-2 border-accent"
          : "bg-white border border-gray-100"
      }`}
      onClick={onClick}
    >
      <div className={`${wasteType.backgroundColor} rounded-full p-3 mb-2 flex items-center justify-center`}>
        <div className={`text-${wasteType.color.substring(3)}`}>
          <Trash2 size={24} />
        </div>
      </div>
      <h3 className="font-medium text-sm">{wasteType.name}</h3>
      <p className="text-xs text-primary mt-1">{wasteType.points} pts</p>
    </button>
  );
};

export default WasteTypeButton;
