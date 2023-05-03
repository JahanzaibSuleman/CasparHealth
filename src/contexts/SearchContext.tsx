import { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
    query: string;
    updateQuery: (value: string) => void;
}

const SearchContext = createContext<SearchContextType>({
    query: '',
    updateQuery: () => { },
});

export function useSearch(): SearchContextType {
    return useContext(SearchContext);
}

interface SearchProviderProps {
    children: ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
    const [query, setQuery] = useState<string>('');

    const updateQuery = (value: string) => {
        setQuery(value);
    }

    const value: SearchContextType = {
        query,
        updateQuery,
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}
