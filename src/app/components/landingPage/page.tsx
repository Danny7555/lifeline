import React from "react";
import NavBar from "./navBar";
import HeroSection from "./heroSection";
import FeatureCards from "./featureCard";

export default function landingPage() {
    return (
        <div>
            <NavBar />
            <HeroSection />
            <FeatureCards />
        </div>
    );
}