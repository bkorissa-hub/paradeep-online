import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollingHeadline } from "./ScrollingHeadline";
import { PromotionalBanner } from "./PromotionalBanner";
import { Sidebar } from "./Sidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollingHeadline enabled={true} />
      <PromotionalBanner enabled={true} />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Sidebar enabled={true} />
    </div>
  );
};

export default MainLayout;
