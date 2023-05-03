import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getPatients } from '../apis';
import { Patient } from '../components/props';

interface PatientsContextType {
    patients: Patient[];
    exceptionData: unknown;
    isLoading: boolean;
    deletePatient: (patientId: string) => void;
}

const PatientsContext = createContext<PatientsContextType>({
    patients: [],
    exceptionData: null,
    isLoading: true,
    deletePatient: () => { },
});

export function usePatients(): PatientsContextType {
    return useContext(PatientsContext);
}

interface PatientsProviderProps {
    children: ReactNode;
}

export function PatientsProvider({ children }: PatientsProviderProps) {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [exceptionData, setExceptionData] = useState<unknown>();
    const [isLoading, setIsLoading] = useState<boolean>(true);



    const deletePatient = (patientId: string) => {
        setPatients(patients.filter(pat => pat.patient_id.toString() !== patientId));
    }

    const onGettingPatients = async () => {
        setIsLoading(true);
        const { data, exception } = await getPatients();
        setPatients(data);
        setIsLoading(false);
        setExceptionData(exception);
    };

    useEffect(() => {
        onGettingPatients();
    }, []);


    const value: PatientsContextType = {
        patients,
        exceptionData,
        isLoading,
        deletePatient,
    };

    return (
        <PatientsContext.Provider value={value}>
            {children}
        </PatientsContext.Provider>
    );
}
