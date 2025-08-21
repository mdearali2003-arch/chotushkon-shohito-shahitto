import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "হোম", path: "/" },
    { name: "কবিতা", path: "/poetry" },
    { name: "গল্প", path: "/stories" },
    { name: "প্রবন্ধ", path: "/essays" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold font-bengali-display literary-gradient-text hover:scale-105 transition-transform duration-300"
          >
            চতুষ্কোণ
          </Link>
          
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "font-bengali text-lg transition-all duration-300 hover:text-accent hover:scale-105",
                  location.pathname === item.path
                    ? "text-accent font-medium border-b-2 border-accent"
                    : "text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;