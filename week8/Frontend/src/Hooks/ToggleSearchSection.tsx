import { useContext, createContext, useState } from "react";

interface ToggleSearchSectionContextType {
    isSearchSectionOpen?: boolean;
    toggleSearchSection?: () => void;
}

export const ToggleSearchSectionContext = createContext<ToggleSearchSectionContextType | undefined>(undefined);

export const ToggleSearchBarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isSearchSectionOpen, setIsSearchSectionOpen] = useState(false);

    const toggleSearchSection = () => {
        setIsSearchSectionOpen(prev => !prev);
    }

    return (
        <ToggleSearchSectionContext.Provider value={{ isSearchSectionOpen, toggleSearchSection }}>
            {children}
        </ToggleSearchSectionContext.Provider>
    )
}

export const useToggleSearchSection = () => {
    const context = useContext(ToggleSearchSectionContext);

    if (!context) {
        throw new Error("useToggleSearchSection must be used within a ToggleSearchBarProvider");
    }
    
    return context;
}