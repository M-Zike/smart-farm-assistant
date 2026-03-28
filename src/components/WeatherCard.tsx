import { Sun, Cloud, CloudRain, CloudSnow, Calendar } from "lucide-react";
import { useWeather } from "@/hooks/useWeather";

const weatherIcons: Record<string, typeof Sun> = {
  "01d": Sun, "01n": Sun, "02d": Cloud, "02n": Cloud,
  "03d": Cloud, "03n": Cloud, "04d": Cloud, "04n": Cloud,
  "09d": CloudRain, "09n": CloudRain, "10d": CloudRain, "10n": CloudRain,
  "13d": CloudSnow, "13n": CloudSnow,
};

const WeatherCard = () => {
  const { weather, loading } = useWeather();

  const Icon = weather ? (weatherIcons[weather.icon] || Sun) : Sun;
  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="mx-5 mb-4 rounded-2xl bg-primary p-4 flex items-center justify-between text-primary-foreground glass-card-dark">
      <div className="flex items-center gap-3">
        <Icon className="w-10 h-10 text-warning" />
        <div>
          <p className="text-2xl font-bold">
            {loading ? "..." : `${Math.round(weather?.temp ?? 24)}°C`}
          </p>
          <p className="text-sm opacity-80">
            {weather?.condition || "Sunny"}, Optimal for planting
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-sm opacity-80">
        <Calendar className="w-4 h-4" />
        <span>{today}</span>
      </div>
    </div>
  );
};

export default WeatherCard;
