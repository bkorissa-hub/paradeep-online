import { HeroSection } from "@/components/home/HeroSection";
import { ServicesHighlight } from "@/components/home/ServicesHighlight";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <ServicesHighlight />
      <FeaturedProducts />
      <Testimonials />
      <CTASection />
    </>
  );
};

export default Home;
