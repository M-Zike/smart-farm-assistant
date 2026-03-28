import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface FarmData {
  crop_health: number;
  irrigated_land: number;
  task_count: number;
}

export const useFarmData = () => {
  const { user } = useAuth();
  const [farmData, setFarmData] = useState<FarmData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    const fetch = async () => {
      const { data, error } = await supabase
        .from("farm_data")
        .select("crop_health, irrigated_land, task_count")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error(error);
        // Seed default data
        const { data: newData } = await supabase
          .from("farm_data")
          .insert({ user_id: user.id, crop_health: 92, irrigated_land: 4.2, task_count: 3 })
          .select("crop_health, irrigated_land, task_count")
          .single();
        setFarmData(newData);
      } else if (!data) {
        const { data: newData } = await supabase
          .from("farm_data")
          .insert({ user_id: user.id, crop_health: 92, irrigated_land: 4.2, task_count: 3 })
          .select("crop_health, irrigated_land, task_count")
          .single();
        setFarmData(newData);
      } else {
        setFarmData(data);
      }
      setLoading(false);
    };

    fetch();
  }, [user]);

  return { farmData, loading };
};
