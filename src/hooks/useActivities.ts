import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Activity {
  id: string;
  title: string;
  subtitle: string | null;
  activity_type: string;
  icon: string;
  created_at: string;
}

export const useActivities = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    const fetch = async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error(error);
      } else if (data && data.length === 0) {
        // Seed sample activities
        const samples = [
          { user_id: user.id, title: "Nitrogen level check", subtitle: "Field A • All clear", activity_type: "soil", icon: "flask" },
          { user_id: user.id, title: "Pest detection", subtitle: "North Sector • AI Scanner", activity_type: "pest", icon: "bug" },
        ];
        const { data: seeded } = await supabase.from("activities").insert(samples).select("*");
        setActivities(seeded || []);
      } else {
        setActivities(data || []);
      }
      setLoading(false);
    };

    fetch();
  }, [user]);

  return { activities, loading };
};
