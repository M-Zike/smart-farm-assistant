import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto relative">
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default AppLayout;
