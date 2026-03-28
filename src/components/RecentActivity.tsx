import { FlaskConical, Bug, Droplets, Leaf } from "lucide-react";
import { useActivities } from "@/hooks/useActivities";
import { formatDistanceToNow } from "date-fns";

const iconMap: Record<string, typeof FlaskConical> = {
  flask: FlaskConical,
  bug: Bug,
  droplets: Droplets,
  leaf: Leaf,
};

const colorMap: Record<string, { text: string; bg: string }> = {
  soil: { text: "text-success", bg: "bg-success/10" },
  pest: { text: "text-warning", bg: "bg-warning/10" },
  water: { text: "text-primary", bg: "bg-primary/10" },
  general: { text: "text-muted-foreground", bg: "bg-muted" },
};

const RecentActivity = () => {
  const { activities, loading } = useActivities();

  return (
    <div className="mx-5 mb-24">
      <h2 className="text-base font-semibold text-foreground mb-3">Recent Activity</h2>
      <div className="space-y-3">
        {loading ? (
          <div className="text-sm text-muted-foreground text-center py-4">Loading...</div>
        ) : activities.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-4">No recent activity</div>
        ) : (
          activities.map((a) => {
            const Icon = iconMap[a.icon] || FlaskConical;
            const colors = colorMap[a.activity_type] || colorMap.general;
            const timeAgo = formatDistanceToNow(new Date(a.created_at), { addSuffix: true });

            return (
              <div key={a.id} className="flex items-center gap-3 p-3 rounded-2xl glass-card">
                <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.subtitle}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{timeAgo}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
