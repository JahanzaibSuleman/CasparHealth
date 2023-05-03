import { createContext, useContext, useState, ReactNode } from 'react';

interface SortedContextType {
    isSorted: boolean;
    toggleSorted: (value: boolean) => void;
}

const SortedContext = createContext<SortedContextType>({
    isSorted: false,
    toggleSorted: () => { },
});

export function useSorted(): SortedContextType {
    return useContext(SortedContext);
}

interface SortedProviderProps {
    children: ReactNode;
}

export function SortedProvider({ children }: SortedProviderProps) {
    const [isSorted, setIsSorted] = useState<boolean>(false);

    const toggleSorted = (value: boolean) => {
        setIsSorted(value);
    }

    const value: SortedContextType = {
        isSorted,
        toggleSorted,
    };

    return (
        <SortedContext.Provider value={value}>
            {children}
        </SortedContext.Provider>
    );
}
