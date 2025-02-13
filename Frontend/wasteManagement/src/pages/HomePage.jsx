import React from "react";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const HomePage = () => {
    return (
        <div>
            {/* <Navigation /> */}
            <div id="hero">
                <Hero />
            </div>
            <div id="about">
                <About />
            </div>
            <div id="services">
                <Services />
            </div>
            {/* <div id="testimonials">
                <Testimonials />
            </div> */}
            <div id="contact">
                <CTA />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
