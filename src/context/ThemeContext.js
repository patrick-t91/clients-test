import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({children}) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    
    const handleTheme = () => {
        if (!isDarkTheme) {
            setIsDarkTheme(true);
        } else { 
            setIsDarkTheme(false);
        }
    }

    const data = { isDarkTheme, handleTheme};
    
    return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
}