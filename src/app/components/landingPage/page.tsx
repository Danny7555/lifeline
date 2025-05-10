import React from "react";
import NavBar from "./navBar";
import HeroSection from "./heroSection";
import FeatureCards from "./featureCard";
import FirstAidScenarios from "./firstAidScenatios";
import Testimonials from "./testimonial";
import LifelineFAQ from "./lifeLineFaq";
import Footer from "./footer";
import { Inter } from "next/font/google";
import ContactUS from "./contact/page";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function landingPage() {
    return (
        <div className={inter.className}>
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