import { LayoutDashboard, ScanLine, BarChart3, Stethoscope, CloudSun, Mountain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: ScanLine, label: "AI Scanner", path: "/ai-scanner" },
  { icon: BarChart3, label: "Insights", path: "/insights" },
  { icon: Stethoscope, label: "Diagnosis", path: "/diagnosis" },
  { icon: CloudSun, label: "Weather", path: "/weather" },
  { icon: Mountain, label: "Terraform Pro", path: "/terraform" },
];

const CoreFeatures = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-5 mb-4">
      <h2 className="text-base font-semibold text-foreground mb-3">Core Features</h2>
      <div className="grid grid-cols-3 gap-3">
        {features.map((f, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate(f.path)}
            className="flex flex-col items-center gap-2 py-4 rounded-2xl glass-card hover:shadow-md transition-shadow"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <f.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-medium text-foreground">{f.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CoreFeatures;
