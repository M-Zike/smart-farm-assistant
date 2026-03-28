import HeaderSection from "@/components/HeaderSection";
import WeatherCard from "@/components/WeatherCard";
import FarmHealthCard from "@/components/FarmHealthCard";
import SearchBar from "@/components/SearchBar";
import CoreFeatures from "@/components/CoreFeatures";
import RecentActivity from "@/components/RecentActivity";

const Index = () => {
  return (
    <div className="pb-24">
      <HeaderSection />
      <WeatherCard />
      <SearchBar />
      <FarmHealthCard />
      <CoreFeatures />
      <RecentActivity />
    </div>
  );
};

export default Index;
