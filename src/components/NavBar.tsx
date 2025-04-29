
import { Home, BookOpen, MapPin, Trash2, ChartBar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: Home, label: "Início" },
    { path: "/educacao", icon: BookOpen, label: "Educação" },
    { path: "/coleta", icon: MapPin, label: "Coleta" },
    { path: "/descarte", icon: Trash2, label: "Descarte" },
    { path: "/estatisticas", icon: ChartBar, label: "Estatísticas" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-1 z-10">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg ${
                isActive 
                  ? "text-primary" 
                  : "text-gray-500 hover:text-primary"
              }`}
            >
              <item.icon size={24} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
