import { Home, FileText, Scan, CloudSun, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: FileText, label: "Reports", path: "/insights" },
  { icon: Scan, label: "", path: "/ai-scanner", isCenter: true },
  { icon: CloudSun, label: "Weather", path: "/weather" },
  { icon: User, label: "Profile", path: "/dashboard" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-nav border-t border-border/50 z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item, i) =>
          item.isCenter ? (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-primary -mt-6 shadow-lg active:scale-95 transition-transform"
            >
              <item.icon className="w-6 h-6 text-primary-foreground" />
            </button>
          ) : (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 text-xs transition-colors ${
                location.pathname === item.path
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          )
        )}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
};

export default BottomNav;
