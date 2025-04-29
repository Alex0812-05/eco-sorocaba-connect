
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface EcoHeaderProps {
  title: string;
  showBackButton?: boolean;
  rightAction?: React.ReactNode;
  className?: string;
}

const EcoHeader = ({
  title,
  showBackButton = true,
  rightAction,
  className = "",
}: EcoHeaderProps) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className={`flex items-center justify-between p-4 ${className}`}>
      <div className="flex items-center">
        {showBackButton && (
          <button 
            onClick={handleBack} 
            className="p-2 mr-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
        )}
        <h1 className="text-xl font-medium">{title}</h1>
      </div>
      {rightAction && <div>{rightAction}</div>}
    </header>
  );
};

export default EcoHeader;
