
import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = "md", showText = true }) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
    xl: "h-16"
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/85ff4149-89f6-4c10-94ff-c436f6800e69.png" 
        alt="SeleCollect Logo" 
        className={`${sizeClasses[size]}`} 
      />
      {showText && <span className={`ml-2 font-bold text-primary ${size === "lg" || size === "xl" ? "text-xl" : ""}`}>SeleCollect</span>}
    </div>
  );
};

export default Logo;
