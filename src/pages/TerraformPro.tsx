import { ArrowLeft, Map, Layers, ZoomIn, ZoomOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import farmMapImg from "@/assets/farm-map.jpg";

const TerraformPro = () => {
  const navigate = useNavigate();

  const layers = [
    { name: "Soil Moisture", active: true, color: "bg-primary" },
    { name: "NDVI Index", active: false, color: "bg-success" },
    { name: "Temperature", active: false, color: "bg-warning" },
    { name: "Elevation", active: false, color: "bg-muted-foreground" },
  ];

  return (
    <div className="pb-24 px-5 pt-12">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Terraform Pro</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl overflow-hidden mb-4 relative">
        <img src={farmMapImg} alt="Farm GIS view" className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute bottom-3 right-3 flex flex-col gap-2">
          <button className="w-9 h-9 rounded-lg glass-card flex items-center justify-center"><ZoomIn className="w-4 h-4 text-foreground" /></button>
          <button className="w-9 h-9 rounded-lg glass-card flex items-center justify-center"><ZoomOut className="w-4 h-4 text-foreground" /></button>
        </div>
        <div className="absolute top-3 left-3 glass-card rounded-lg px-3 py-1.5 flex items-center gap-2">
          <Map className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-foreground">Satellite View</span>
        </div>
      </motion.div>

      <div className="glass-card rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Map Layers</h3>
        </div>
        <div className="space-y-2">
          {layers.map((layer) => (
            <label key={layer.name} className="flex items-center gap-3 py-1.5 cursor-pointer">
              <div className={`w-4 h-4 rounded ${layer.color} ${!layer.active && "opacity-30"}`} />
              <span className={`text-sm ${layer.active ? "text-foreground font-medium" : "text-muted-foreground"}`}>{layer.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Field Statistics</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Total Area", value: "12.5 ha" },
            { label: "Active Zones", value: "4" },
            { label: "Avg Moisture", value: "68%" },
            { label: "Soil Type", value: "Loamy" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-lg font-bold text-primary">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TerraformPro;
