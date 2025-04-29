
import React from "react";
import { cn } from "@/lib/utils";

interface EcoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  isFullWidth?: boolean;
  children: React.ReactNode;
}

const EcoButton: React.FC<EcoButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  isFullWidth = false,
  children,
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: "py-2 px-3 text-sm",
    md: "py-3 px-4",
    lg: "py-4 px-6 text-lg"
  };
  
  const variantClasses = {
    primary: "bg-primary hover:bg-primary-light text-white",
    secondary: "bg-secondary hover:bg-opacity-90 text-white",
    outline: "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white"
  };

  return (
    <button
      className={cn(
        "rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center justify-center gap-2",
        sizeClasses[size],
        variantClasses[variant],
        isFullWidth ? "w-full" : "",
        className
      )}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default EcoButton;
