import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import './ChatBox.css';

const ChatBox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi there! How can we help you achieve your fitness goals today?", isBot: true }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userText = inputValue.trim();
        setMessages(prev => [...prev, { text: userText, isBot: false }]);
        setInputValue('');

        // Simulate bot response
        setTimeout(() => {
            let botReply = "Thanks for reaching out! A coach will be with you shortly. Please leave your email or phone number.";
            const lowerInput = userText.toLowerCase();

            if (lowerInput.includes('fatloss') || lowerInput.includes('fat loss') || lowerInput.includes('lose fat') || lowerInput.includes('weight loss')) {
                botReply = "We are here to help. Please keep in mind that effective results require a three-month commitment, not just one.";
            } else if (lowerInput.includes('pricing') || lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('plan') || lowerInput.includes('pay') || lowerInput.includes('charge')) {
                botReply = "Sure. lemme me take you to pricing.";
                setMessages(prev => [...prev, { text: botReply, isPricing: true, isBot: true }]);

                setTimeout(() => {
                    setMessages(prev => [...prev, { text: "Thanks for reaching out! A coach will be with you shortly. Please leave your email or phone number.", isBot: true }]);
                }, 5000);

                return;
            } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                botReply = "Hello there! How can we help you achieve your fitness goals today?";
            } else if (lowerInput.includes('contact') || lowerInput.includes('talk') || lowerInput.includes('coach')) {
                botReply = "You can reach us directly via the Contact form or call us at (555) 123-4567.";
            } else if (lowerInput.includes('problem') || lowerInput.includes('issue') || lowerInput.includes('help')) {
                botReply = "Could you tell us more about the problems you are facing? Our coaching is fully personalized and we can definitely assist you.";
            }

            setMessages(prev => [...prev, { text: botReply, isBot: true }]);
        }, 1000);
    };

    return (
        <div className={`chatbox-container ${isOpen ? 'open' : ''}`}>
            {!isOpen && (
                <button className="chatbox-toggle" onClick={() => setIsOpen(true)}>
                    <MessageCircle size={28} />
                </button>
            )}

            {isOpen && (
                <div className="chatbox-window">
                    <div className="chatbox-header">
                        <div className="chatbox-title">
                            <MessageCircle size={20} />
                            <span>Support Chat</span>
                        </div>
                        <button className="chatbox-close-btn" onClick={() => setIsOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>

                    <div className="chatbox-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message-wrapper ${msg.isBot ? 'bot' : 'user'}`}>
                                {msg.isPricing ? (
                                    <div className="pricing-message-container">
                                        <div className="message-bubble">
                                            {msg.text}
                                        </div>
                                        <div className="chatbox-pricing-cards">
                                            <div className="mini-plan">
                                                <h4>Basic</h4>
                                                <div className="mini-price">Inr 12,000<span>/mo</span></div>
                                                <a href="#pricing" className="mini-btn">View</a>
                                            </div>
                                            <div className="mini-plan popular">
                                                <h4>Pro</h4>
                                                <div className="mini-price">Inr 36,000<span>/3 months</span></div>
                                                <a href="#pricing" className="mini-btn">View</a>
                                            </div>
                                            <div className="mini-plan">
                                                <h4>Elite</h4>
                                                <div className="mini-price">Inr 70,000<span>/6 months</span></div>
                                                <a href="#pricing" className="mini-btn">View</a>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="message-bubble">
                                        {msg.text}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chatbox-input-area" onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button type="submit" disabled={!inputValue.trim()}>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBox;
