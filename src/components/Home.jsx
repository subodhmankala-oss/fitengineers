import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import Services from './Services';
import MyPrograms from './MyPrograms';
import Pricing from './Pricing';
import About from './About';
import Testimonials from './Testimonials';
import Contact from './Contact';

const Home = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Extract section ID from path (e.g., "/about" -> "about")
        // Default to 'home' if path is "/"
        const sectionId = pathname === '/' ? 'home' : pathname.replace('/', '');

        // Add small delay to ensure render is complete
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                // If no section matches, scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 100);
    }, [pathname]);

    return (
        <main>
            <Hero />
            <About />
            <Services />
            <MyPrograms />
            <Pricing />
            <Testimonials />
            <Contact />
        </main>
    );
};

export default Home;
