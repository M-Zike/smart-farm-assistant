import { ArrowLeft, Stethoscope, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const symptomOptions = [
  "Yellow leaves", "Brown spots", "Wilting", "Stunted growth",
  "Holes in leaves", "White powder", "Root rot", "Curling leaves",
];

const Diagnosis = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<{ condition: string; severity: string; treatment: string[] } | null>(null);

  const toggle = (s: string) => {
    setSelected((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
    setDiagnosis(null);
  };

  const handleDiagnose = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setDiagnosis({
      condition: "Nitrogen Deficiency",
      severity: "Moderate",
      treatment: [
        "Apply urea fertilizer at 50kg/ha",
        "Ensure proper soil pH (6.0-7.0)",
        "Consider foliar nitrogen spray for quick recovery",
        "Monitor new growth in 7-10 days",
      ],
    });
    setLoading(false);
  };

  return (
    <div className="pb-24 px-5 pt-12">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Diagnosis</h1>
      </div>

      <div className="glass-card rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Stethoscope className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Select Symptoms</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {symptomOptions.map((s) => (
            <button
              key={s}
              onClick={() => toggle(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${
                selected.includes(s)
                  ? "bg-primary text-primary-foreground"
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <Button onClick={handleDiagnose} disabled={selected.length === 0 || loading} className="w-full gap-2 mb-4">
        <Send className="w-4 h-4" />
        {loading ? "Analyzing..." : "Get Diagnosis"}
      </Button>

      <AnimatePresence>
        {diagnosis && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-4 space-y-3">
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Condition</p>
                <p className="text-base font-semibold text-foreground">{diagnosis.condition}</p>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                diagnosis.severity === "Moderate" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"
              }`}>
                {diagnosis.severity}
              </span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Treatment Plan</p>
              <ol className="space-y-1.5">
                {diagnosis.treatment.map((t, i) => (
                  <li key={i} className="text-sm text-foreground flex gap-2">
                    <span className="text-primary font-bold">{i + 1}.</span> {t}
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Diagnosis;
