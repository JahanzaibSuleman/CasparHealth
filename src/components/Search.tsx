import { TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useSearch } from '../contexts/SearchContext';

const Search: React.FC = () => {

    const { query, updateQuery } = useSearch();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = query;
        }
    }, [])

    const onChangeInput = (e: { target: { value: string; }; }) => {
        setTimeout(() => {
            updateQuery(e.target.value.toLowerCase());
        }, 500);
    }

    return <TextField placeholder='Search by name, ID or email' inputRef={inputRef} variant="outlined" onChange={onChangeInput} />;
}

export default Search;