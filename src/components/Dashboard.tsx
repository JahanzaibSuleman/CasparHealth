import React, { createContext, useCallback, useEffect, useState } from 'react';
import PatientsList from './PatientsList';
import { usePatients } from '../contexts/PatientsContext'
import { Patient } from './props';
import Search from './Search';
import { useSearch } from '../contexts/SearchContext';
import ToggleSort from './ToggleSort';
import GenderFilter from './GenderFilter';
import { useSorted } from '../contexts/SortContext';
import { useGender } from '../contexts/GenderContext';
import { useAge } from '../contexts/AgeContext';
import AgeFilter from './AgeFilter';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';

const Dashboard: React.FC = () => {
    const [patientsData, setPatientsData] = useState<Patient[]>([]);
    const [error, setError] = useState<string>('');
    const { patients, exceptionData, isLoading } = usePatients();

    const { query } = useSearch();
    const { isSorted } = useSorted();
    const { gender } = useGender();
    const { age } = useAge();

    useEffect(() => {
        if (patients) {
            setError('');
            shouldDisplaySortedAndFiltered(patients);
        } else {
            setError(exceptionData ? 'Something went wrong.' : 'List is empty.');
        }
    }, [patients, exceptionData, query, isSorted, gender, age]);

    useEffect(() => {
        if (!patientsData.length) {
            setError('List is empty.');
        }
    }, [patientsData]);


    const shouldDisplaySortedAndFiltered = useCallback((patientsToBeSorted: Patient[]) => {
        let filteredData = [...patientsToBeSorted];

        if (query) {
            filteredData = patientsToBeSorted.filter(pat => {
                return pat.patient_id?.toString() === query
                    || pat.email?.toLowerCase().includes(query)
                    || pat.first_name?.toLowerCase().includes(query)
                    || pat.last_name?.toLowerCase().includes(query);
            });
        }

        let filteredPatientsByGender = filteredData.filter(pat => {
            return gender === 'All' ? true : pat.gender === gender;
        });

        let ageFilteredPatients = filteredPatientsByGender.filter(pat => {
            if (age === 'all') {
                return true;
            } else if (age === 'gTOET18') {
                return pat.age >= 18 && pat.age <= 30;
            } else if (age === 'gTOET31') {
                return pat.age >= 31 && pat.age <= 45;
            } else if (age === 'gT45') {
                return pat.age > 45;
            }
        });

        if (isSorted) {
            setPatientsData(ageFilteredPatients.sort((a, b) => {
                const valueA = `${a.first_name} ${a.last_name}`;
                const valueB = `${b.first_name} ${b.last_name}`;

                if (valueA > valueB) {
                    return 1;
                } else if (valueB > valueA) {
                    return -1;
                } else {
                    return 0;
                }
            }));
        } else {
            setPatientsData(ageFilteredPatients);
        }
    }, [query, isSorted, gender, age]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 4 }}>
            {isLoading ? <CircularProgress /> :
                <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
                    <Search />
                    <Box sx={{ mt: 4 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={2}>
                                <Typography>Sort alphabetically</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <ToggleSort />
                            </Grid>
                            <Grid item xs={4}>
                                <GenderFilter />
                            </Grid>
                            <Grid item xs={4}>
                                <AgeFilter />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ mt: 4 }}>
                        <PatientsList patientsList={patientsData} />
                    </Box>
                    {!isLoading && (
                        <Box sx={{ mt: 4 }}>
                            <p className="error">
                                <small>{error}</small>
                            </p>
                        </Box>
                    )}
                </Box>}
        </Box>
    );
}

export default Dashboard;