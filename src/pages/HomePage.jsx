import Layout from "../components/Layout.jsx";
import WhyChooseUs from "./WhyChooseUs.jsx";
import ResearchPage from "./ResearchPage.jsx";
import EventsPage from "./EventsPage.jsx";
import HeroSection from "../components/HeroSection.jsx";
import Happenings from "../components/Happenings.jsx";
import CompaniesTieUps from "../components/Tieups.jsx";
import NewsSection from "../components/NewsAndEvents.jsx";
import FloatingAdmissionAlert from "../components/FloatingSocialMediaIcons.jsx";
import TestimonialSlider from "../components/Testimonial.jsx";
import CircleSlider from "../components/CompanyTieUps.jsx";
import SemiCircularLogoSlider from "../components/CompanyTieUps.jsx";
import LogoCarousel from "../components/CompanyTieUps.jsx";
import LogoSlider from "../components/CompanyTieUps.jsx";
import CircularLogoCarousel from "../components/CompanyTieUps.jsx";
import HiringPartnersSection from "../components/CompanyTieUps.jsx";
import StatsSection from "../components/StatsSection.jsx";
import GovernmentApprovals from "../components/GovernmentApprovals.jsx";
import ApprovalsSection from "../components/GovernmentApprovals.jsx";
import ProgramsSection from "../components/ProgramsSection.jsx";
import AIBanner from "../components/Aibanner.jsx";
import AIBannerV2 from "../components/Aibanner.jsx";
import NeoAIBanner from "../components/Aibanner.jsx";
import LightAIBanner from "../components/Aibanner.jsx";
import CompactAIBanner from "../components/Aibanner.jsx";
import ThinkInspirationSection from "../components/ThinkInspiration.jsx";
import PopupForm from "../components/PopupForm.jsx";
import TopScrollButton from "../components/ScrollTopButton.jsx";
import LatestNews from "../components/LatestNews.jsx";
import { Helmet } from "react-helmet";
// import InstagramEmbedComponent from "../components/InstagramFeed.jsx";
import InstagramFeed from "../components/InstagramFeed.jsx";
import ScholarshipPopup from "../components/ScholarshipPopup.jsx";

function Home() {
  const logos = [
    'https://pngimg.com/d/microsoft_PNG17.png',
    'https://pngimg.com/d/microsoft_PNG17.png',
    'https://pngimg.com/d/microsoft_PNG17.png',
    'https://pngimg.com/d/microsoft_PNG17.png',
    'https://pngimg.com/d/microsoft_PNG17.png',
    'https://pngimg.com/d/microsoft_PNG17.png',
    'https://pngimg.com/d/microsoft_PNG17.png',
    
  ];
  return (
    <>
    <Helmet>
  <title>Saroj International University | India's Gateway to Next-Gen Education</title>
  <meta name="description" content="Welcome to Saroj International University. Explore top programs in AI, business, health, and more." />
</Helmet>
      <Layout>
      
        <PopupForm/>
        
        <HeroSection/>
        <LightAIBanner/>
        <CompaniesTieUps/>
        <StatsSection/>
        <HiringPartnersSection />
        <InstagramFeed />
        <ApprovalsSection />
       <ThinkInspirationSection/>
        <ProgramsSection />
        <NewsSection/>
        <TestimonialSlider />
      
        
        
      </Layout>
    </>
  );
}

export default Home;
