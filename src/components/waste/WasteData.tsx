
import React from "react";
import { Trash2 } from "lucide-react";

// Define os tipos de resíduos e seus dados
export const wasteTypes = [
  {
    id: "paper",
    name: "Papel/Papelão",
    icon: <Trash2 size={24} className="text-white" />,
    color: "bg-blue-500",
    backgroundColor: "bg-[#F2FCE2]",
    examples: "Jornais, revistas, caixas, embalagens de papel",
    points: 10
  },
  {
    id: "plastic",
    name: "Plástico",
    icon: <Trash2 size={24} className="text-white" />,
    color: "bg-red-500",
    backgroundColor: "bg-[#F2FCE2]",
    examples: "Garrafas, embalagens, sacolas plásticas",
    points: 15
  },
  {
    id: "glass",
    name: "Vidro",
    icon: <Trash2 size={24} className="text-white" />,
    color: "bg-green-500",
    backgroundColor: "bg-[#F2FCE2]",
    examples: "Garrafas, potes, frascos",
    points: 20
  },
  {
    id: "metal",
    name: "Metal",
    icon: <Trash2 size={24} className="text-white" />,
    color: "bg-yellow-500",
    backgroundColor: "bg-[#F2FCE2]",
    examples: "Latas de alumínio, tampas, embalagens metálicas",
    points: 25
  },
  {
    id: "organic",
    name: "Orgânico",
    icon: <Trash2 size={24} className="text-white" />,
    color: "bg-secondary",
    backgroundColor: "bg-[#F2FCE2]",
    examples: "Restos de alimentos, cascas de frutas e legumes",
    points: 5
  },
  {
    id: "electronic",
    name: "Eletrônico",
    icon: <Trash2 size={24} className="text-white" />,
    color: "bg-orange-500",
    backgroundColor: "bg-[#F2FCE2]",
    examples: "Pilhas, baterias, celulares, computadores",
    points: 30
  },
  {
    id: "hazardous",
    name: "Perigoso",
    icon: <Trash2 size={24} className="text-white" />,
    color: "bg-danger",
    backgroundColor: "bg-[#F2FCE2]",
    examples: "Produtos químicos, medicamentos vencidos",
    points: 15
  }
];

// Exporta o tipo para uso em outros componentes
export type WasteType = typeof wasteTypes[0];
