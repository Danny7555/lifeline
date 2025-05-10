"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import NavBar from "./navBar";
import HeroSection from "./heroSection";
import FeatureCards from "./featureCard";
import FirstAidScenarios from "./firstAidScenatios";
import Testimonials from "./testimonial";
import LifelineFAQ from "./lifeLineFaq";
import Footer from "./footer";
import { Inter } from "next/font/google";
import ContactUS from "./contact/page";
import Loader from "./Loader";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function LandingPage() {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    
    useEffect(() => {
        const handleNavigation = () => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 5000);
        };

        window.addEventListener('beforeunload', handleNavigation);
        
        return () => {
            window.removeEventListener('beforeunload', handleNavigation);
        };
    }, [pathname]);

    return (
        <div className={inter.className}>
            <Loader isLoading={isLoading} />
            <NavBar />
            <HeroSection />
            <FeatureCards /><br/>
            <FirstAidScenarios />
            <Testimonials />
            <ContactUS />
            <LifelineFAQ />
            <Footer />
        </div>
    );
}