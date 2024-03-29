export interface Patient {
    patient_id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    age: number;
    avatar: string;
}

export interface PatientsListProps {
    patientsList: Patient[];
}

export interface PatientListItemProps {
    patient: Patient;
}
