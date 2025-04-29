
import React from "react";
import { cn } from "@/lib/utils";

interface EcoCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const EcoCard = ({ 
  title, 
  description, 
  icon, 
  className, 
  onClick, 
  children 
}: EcoCardProps) => {
  return (
    <div 
      className={cn(
        "eco-card flex flex-col items-center text-center", 
        onClick && "cursor-pointer", 
        className
      )}
      onClick={onClick}
    >
      {icon && (
        <div className="text-primary mb-3 mt-1">
          {icon}
        </div>
      )}
      <h3 className="font-medium text-lg mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
      {children}
    </div>
  );
};

export default EcoCard;
