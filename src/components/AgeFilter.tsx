import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useAge } from '../contexts/AgeContext';

const AgeFilter: React.FC = () => {

    const { age, updateAgeFilter } = useAge();

    return (
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <InputLabel id="age-filter-label">Age Range</InputLabel>
            <Select
                labelId="age-filter-label"
                value={age}
                onChange={(e) => updateAgeFilter(e.target.value)}
                label="Age Range"
            >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="gTOET18">18 - 30</MenuItem>
                <MenuItem value="gTOET31">31 - 45</MenuItem>
                <MenuItem value="gT45">&gt; 45</MenuItem>
            </Select>
        </FormControl>
    );
}

export default AgeFilter;