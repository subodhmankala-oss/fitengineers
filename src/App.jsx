import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import IdealBodyCalculator from './components/IdealBodyCalculator';
import BMICalculator from './components/BMICalculator';
import BodyFatCalculator from './components/BodyFatCalculator';
import CalorieCalculator from './components/CalorieCalculator';
import ProteinCalculator from './components/ProteinCalculator';
import CarbCalculator from './components/CarbCalculator';
import MacrosCalculator from './components/MacrosCalculator';
import Footer from './components/Footer';
import Popup from './components/Popup';
import MusicPlayer from './components/MusicPlayer';
import ChatBox from './components/ChatBox';
import { PopupProvider, usePopup } from './context/PopupContext';
import './App.css';

// Create an inner component to use the context
const AppContent = () => {
  const { isPopupOpen, closePopup } = usePopup();

  return (
    <div className="app">
      <Popup externalOpen={isPopupOpen} setExternalOpen={closePopup} />
      <MusicPlayer />
      <Navbar />
      <Routes>
        {/* Map all valid routes to Home, which handles the scrolling */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/services" element={<Home />} />
        <Route path="/programs" element={<Home />} />
        <Route path="/pricing" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/ideal-body-calculator" element={<IdealBodyCalculator />} />
        <Route path="/bmi-calculator" element={<BMICalculator />} />
        <Route path="/body-fat-calculator" element={<BodyFatCalculator />} />
        <Route path="/calorie-calculator" element={<CalorieCalculator />} />
        <Route path="/protein-calculator" element={<ProteinCalculator />} />
        <Route path="/carb-calculator" element={<CarbCalculator />} />
        <Route path="/macros-calculator" element={<MacrosCalculator />} />
      </Routes>
      <Footer />
      <ChatBox />
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <PopupProvider>
        <Router>
          <AppContent />
        </Router>
      </PopupProvider>
    </HelmetProvider>
  );
}

export default App;
