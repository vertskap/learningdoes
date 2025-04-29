import { createContext, useContext, useState } from "react";

const AttempsContext = createContext();

export const useAttemps = () => useContext(AttempsContext);

export const AttempsProvider = ({ children }) => {
    const [attemps, setAttemps] = useState(3);

    return (
        <AttempsContext.Provider value={{ attemps, setAttemps }}>
            {children}
        </AttempsContext.Provider>
    );
};