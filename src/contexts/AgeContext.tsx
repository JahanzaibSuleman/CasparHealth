import { createContext, useContext, useState, ReactNode } from 'react';

interface AgeContextType {
    age: string;
    updateAgeFilter: (value: string) => void;
}

const AgeContext = createContext<AgeContextType>({
    age: 'all',
    updateAgeFilter: () => { },
});

export function useAge(): AgeContextType {
    return useContext(AgeContext);
}

interface AgeProviderProps {
    children: ReactNode;
}

export function AgeProvider({ children }: AgeProviderProps) {
    const [age, setAge] = useState<string>('all');

    const updateAgeFilter = (value: string) => {
        setAge(value);
    }

    const value: AgeContextType = {
        age,
        updateAgeFilter,
    };

    return (
        <AgeContext.Provider value={value}>
            {children}
        </AgeContext.Provider>
    );
}
