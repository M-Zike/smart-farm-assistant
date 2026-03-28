import { Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const HeaderSection = () => {
  const { user } = useAuth();
  const [notifCount] = useState(3);
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Farmer";
  const initials = displayName.slice(0, 2).toUpperCase();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="flex items-center justify-between px-5 pt-12 pb-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
          {initials}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{greeting},</p>
          <p className="text-lg font-semibold text-foreground">{displayName}</p>
        </div>
      </div>
      <button className="relative w-10 h-10 rounded-full glass-card flex items-center justify-center">
        <Bell className="w-5 h-5 text-foreground" />
        {notifCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center animate-pulse">
            {notifCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default HeaderSection;
