import { ArrowLeft, TrendingUp, Droplets, ListChecks, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFarmData } from "@/hooks/useFarmData";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const { farmData } = useFarmData();

  const stats = [
    { label: "Crop Health", value: `${farmData?.crop_health ?? 92}%`, icon: Leaf, color: "text-success" },
    { label: "Irrigated", value: `${farmData?.irrigated_land ?? 4.2}ha`, icon: Droplets, color: "text-primary" },
    { label: "Active Tasks", value: `${farmData?.task_count ?? 3}`, icon: ListChecks, color: "text-warning" },
    { label: "Growth Rate", value: "+12%", icon: TrendingUp, color: "text-success" },
  ];

  return (
    <div className="pb-24 px-5 pt-12">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-4"
          >
            <s.icon className={`w-6 h-6 ${s.color} mb-2`} />
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-4 mb-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Field Performance</h3>
        {["Field A", "Field B", "Field C"].map((field, i) => (
          <div key={i} className="mb-3 last:mb-0">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">{field}</span>
              <span className="text-foreground font-medium">{90 - i * 8}%</span>
            </div>
            <Progress value={90 - i * 8} className="h-2" />
          </div>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          {["Add Task", "Log Activity", "Update Health", "View Reports"].map((action) => (
            <button key={action} className="py-2.5 px-3 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors active:scale-95">
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
