import React, { createContext, useState, useContext } from 'react';

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(undefined); // undefined means it hasn't been triggered manually yet

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    return (
        <PopupContext.Provider value={{ isPopupOpen, openPopup, closePopup }}>
            {children}
        </PopupContext.Provider>
    );
};
