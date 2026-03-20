import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import Services from './Services';
import MyPrograms from './MyPrograms';
import Pricing from './Pricing';
import About from './About';
import Testimonials from './Testimonials';
import Contact from './Contact';
import SEO from './SEO';

const seoData = {
    '/': { title: 'Subodh Mankala | Personal Trainer', desc: 'Transform your fitness with personalized training in Hyderabad. Expert coaching, custom workouts, and nutrition plans.' },
    '/about': { title: 'About Subodh Mankala | Fitness Expert', desc: 'Learn more about Subodh Mankala, a certified personal trainer with 10+ years of experience helping clients achieve their fitness goals.' },
    '/services': { title: 'Fitness Services | Subodh Mankala', desc: 'Explore my fitness services including personal training, online coaching, and custom nutrition plans.' },
    '/programs': { title: 'Fitness Programs | Subodh Mankala', desc: 'Join my specialized 3-month and 6-month transformational fitness programs to reach your peak physique.' },
    '/pricing': { title: 'Training Plans & Pricing | Subodh Mankala', desc: 'View pricing for online and offline personal training and nutrition plans. Start your transformation today.' },
    '/contact': { title: 'Contact Subodh Mankala', desc: 'Get in touch to start your fitness journey. Book a consultation or ask any questions about my training programs.' }
};

const Home = () => {
    const location = useLocation();
    const pathname = location.pathname;

    useEffect(() => {
        // If the URL changed because the user was naturally scrolling down the page, 
        // DO NOT scroll them forcefully (which causes jitter).
        if (location.state?.preventScroll) {
            return;
        }

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
    }, [pathname, location.state]);

    return (
        <main>
            <SEO 
                title={seoData[pathname]?.title || seoData['/'].title} 
                description={seoData[pathname]?.desc || seoData['/'].desc} 
                name="Subodh Mankala" 
                type="website" 
            />
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
