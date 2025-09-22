import { createContext, useContext, useState, ReactNode } from 'react';
import { Theme } from '../types/Theme';
import { THEME } from '../types/Theme';

export interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType|undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
    const [theme, setTheme] = useState<Theme>(THEME.LIGHT);

    const toggleTheme = () => {
        setTheme((prev) => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error(
        'useTheme는 반드시 ThemeProvider 내부에서 사용되어야 합니다.'
    )
    return context;
}