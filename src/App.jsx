import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
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
      </Routes>
      <Footer />
      <ChatBox />
    </div>
  );
};

function App() {
  return (
    <PopupProvider>
      <Router>
        <AppContent />
      </Router>
    </PopupProvider>
  );
}

export default App;
