import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  humidity: number;
  wind: number;
  city: string;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        let lat = 28.6139;
        let lon = 77.209;

        if (navigator.geolocation) {
          try {
            const pos = await new Promise<GeolocationPosition>((resolve, reject) =>
              navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 })
            );
            lat = pos.coords.latitude;
            lon = pos.coords.longitude;
          } catch {
            // Use default coordinates
          }
        }

        const { data, error } = await supabase.functions.invoke("get-weather", {
          body: { lat, lon },
        });

        if (error) throw error;
        setWeather(data);
      } catch (err) {
        console.error("Weather fetch failed:", err);
        // Fallback data
        setWeather({
          temp: 24,
          condition: "Sunny",
          icon: "01d",
          humidity: 65,
          wind: 12,
          city: "Your Farm",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { weather, loading };
};
