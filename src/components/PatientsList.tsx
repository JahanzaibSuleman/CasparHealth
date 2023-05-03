import React from 'react';
import PatientListItem from './PatientsListItem';
import { Patient, PatientsListProps } from './props';

const PatientsList: React.FC<PatientsListProps> = ({ patientsList }) => {
    return (
        <>
            <div className='data-table table-header'>
                <table>
                    <thead>
                        <tr>
                            <td>Patient ID</td>
                            <td>Full Name</td>
                            <td>Go to Patient Details</td>
                        </tr>
                    </thead>
                </table></div>
            {patientsList && <div className="data-table">
                <table>
                    <tbody>
                        {patientsList.map((patient: Patient) => {
                            return <PatientListItem key={patient.patient_id} patient={patient} />
                        })}
                    </tbody>
                </table>
            </div>}
        </>
    );
};

export default PatientsList;