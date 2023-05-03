import { createContext, useContext, useState, ReactNode } from 'react';

interface GenderContextType {
    gender: string;
    updateGender: (value: string) => void;
}

const GenderContext = createContext<GenderContextType>({
    gender: 'All',
    updateGender: () => { },
});

export function useGender(): GenderContextType {
    return useContext(GenderContext);
}

interface GenderProviderProps {
    children: ReactNode;
}

export function GenderProvider({ children }: GenderProviderProps) {
    const [gender, setGender] = useState<string>('All');

    const updateGender = (value: string) => {
        setGender(value);
    }

    const value: GenderContextType = {
        gender,
        updateGender,
    };

    return (
        <GenderContext.Provider value={value}>
            {children}
        </GenderContext.Provider>
    );
}
