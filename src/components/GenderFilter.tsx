import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import { useGender } from '../contexts/GenderContext';

const GenderFilter: React.FC = () => {
    const { gender, updateGender } = useGender();

    return (
        <RadioGroup
            name="gender"
            value={gender}
            onChange={(e) => updateGender(e.target.value)}
            row
        >
            <FormControlLabel
                value="Male"
                control={<Radio />}
                label="Male"
            />
            <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
            />
            <FormControlLabel
                value="All"
                control={<Radio />}
                label="All"
            />
        </RadioGroup>
    );
}

export default GenderFilter;