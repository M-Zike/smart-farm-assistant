import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const barData = [
  { month: "Jan", yield: 4.2 }, { month: "Feb", yield: 3.8 }, { month: "Mar", yield: 5.1 },
  { month: "Apr", yield: 4.9 }, { month: "May", yield: 6.2 }, { month: "Jun", yield: 5.8 },
];

const lineData = [
  { day: "Mon", health: 88 }, { day: "Tue", health: 90 }, { day: "Wed", health: 85 },
  { day: "Thu", health: 92 }, { day: "Fri", health: 94 }, { day: "Sat", health: 91 }, { day: "Sun", health: 93 },
];

const pieData = [
  { name: "Wheat", value: 40 }, { name: "Rice", value: 30 },
  { name: "Corn", value: 20 }, { name: "Soy", value: 10 },
];
const COLORS = ["hsl(123,38%,24%)", "hsl(122,30%,34%)", "hsl(36,60%,55%)", "hsl(142,60%,40%)"];

const InsightsHub = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-24 px-5 pt-12">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Insights Hub</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-4 mb-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Yield Trends (tons/ha)</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(120,10%,88%)" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="yield" fill="hsl(123,38%,24%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-4 mb-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Crop Health (7 days)</h3>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(120,10%,88%)" />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis domain={[80, 100]} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="health" stroke="hsl(142,60%,40%)" strokeWidth={2} dot={{ fill: "hsl(142,60%,40%)" }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Crop Distribution</h3>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
              {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default InsightsHub;
