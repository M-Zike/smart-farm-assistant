import { ArrowLeft, Droplets, Wind, Eye, Thermometer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWeather } from "@/hooks/useWeather";
import { motion } from "framer-motion";

const forecast = [
  { day: "Mon", temp: 26, icon: "☀️" },
  { day: "Tue", temp: 24, icon: "⛅" },
  { day: "Wed", temp: 22, icon: "🌧️" },
  { day: "Thu", temp: 23, icon: "⛅" },
  { day: "Fri", temp: 25, icon: "☀️" },
  { day: "Sat", temp: 27, icon: "☀️" },
  { day: "Sun", temp: 24, icon: "🌤️" },
];

const WeatherPage = () => {
  const navigate = useNavigate();
  const { weather } = useWeather();

  const details = [
    { icon: Droplets, label: "Humidity", value: `${weather?.humidity ?? 65}%` },
    { icon: Wind, label: "Wind", value: `${weather?.wind ?? 12} km/h` },
    { icon: Eye, label: "Visibility", value: "10 km" },
    { icon: Thermometer, label: "Feels Like", value: `${Math.round((weather?.temp ?? 24) + 2)}°C` },
  ];

  return (
    <div className="pb-24 px-5 pt-12">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">Weather Forecast</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 mb-4 text-center bg-primary text-primary-foreground">
        <p className="text-5xl font-bold mb-1">{Math.round(weather?.temp ?? 24)}°C</p>
        <p className="text-lg opacity-80">{weather?.condition ?? "Sunny"}</p>
        <p className="text-sm opacity-60 mt-1">{weather?.city ?? "Your Location"}</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {details.map((d, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card rounded-xl p-3 flex items-center gap-3">
            <d.icon className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">{d.label}</p>
              <p className="text-sm font-semibold text-foreground">{d.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card rounded-2xl p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">7-Day Forecast</h3>
        <div className="flex justify-between">
          {forecast.map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-muted-foreground">{f.day}</span>
              <span className="text-lg">{f.icon}</span>
              <span className="text-xs font-medium text-foreground">{f.temp}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
