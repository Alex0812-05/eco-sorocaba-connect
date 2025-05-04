
import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = "md", showText = true }) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12"
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/public/lovable-uploads/85ff4149-89f6-4c10-94ff-c436f6800e69.png" 
        alt="SeleCollect Logo" 
        className={`${sizeClasses[size]}`} 
      />
      {showText && <span className="ml-2 font-bold text-primary">SeleCollect</span>}
    </div>
  );
};

export default Logo;
