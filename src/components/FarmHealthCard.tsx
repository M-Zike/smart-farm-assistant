import { useFarmData } from "@/hooks/useFarmData";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import farmMapImg from "@/assets/farm-map.jpg";

const FarmHealthCard = () => {
  const { farmData, loading } = useFarmData();
  const navigate = useNavigate();

  const cropHealth = farmData?.crop_health ?? 92;
  const irrigated = farmData?.irrigated_land ?? 4.2;
  const tasks = farmData?.task_count ?? 3;

  return (
    <div className="mx-5 mb-4">
      <div className="relative rounded-2xl overflow-hidden glass-card">
        <img src={farmMapImg} alt="Farm satellite view" className="w-full h-36 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute top-3 left-4 right-4 flex justify-between items-center">
          <p className="text-sm font-semibold text-white">Farm Health Overlay</p>
          <button onClick={() => navigate("/dashboard")} className="text-xs text-white/80 hover:text-white transition-colors">
            View Dash
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-primary">{loading ? "..." : `${cropHealth}%`}</p>
          <p className="text-[11px] text-muted-foreground">Crop Health</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-primary">{loading ? "..." : `${irrigated}ha`}</p>
          <p className="text-[11px] text-muted-foreground">Irrigated</p>
        </div>
        <div className="glass-card rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-primary">{loading ? "..." : tasks}</p>
          <p className="text-[11px] text-muted-foreground">Tasks</p>
        </div>
      </div>

      <div className="mt-3 glass-card rounded-xl p-3">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-muted-foreground">Overall Health</span>
          <span className="font-medium text-foreground">{cropHealth}%</span>
        </div>
        <Progress value={cropHealth} className="h-2" />
      </div>
    </div>
  );
};

export default FarmHealthCard;
