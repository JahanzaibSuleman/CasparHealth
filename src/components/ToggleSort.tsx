import { Switch } from '@mui/material';
import React from 'react';
import { useSorted } from '../contexts/SortContext';

const ToggleSort: React.FC = () => {
    const { isSorted, toggleSorted } = useSorted();

    return (
        <Switch
            checked={isSorted}
            onChange={(e) => toggleSorted(e.target.checked)}
        />
    );
}

export default ToggleSort;