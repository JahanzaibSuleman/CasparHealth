import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { PatientListItemProps } from './props';

const PatientListItem: React.FC<PatientListItemProps> = ({ patient }) => {
    const { patient_id, first_name, last_name } = patient;
    return (
        <tr>
            <td>{patient_id}</td>
            <td>{`${first_name} ${last_name}`}</td>
            <td>
                <Link to={`/patients/${patient_id}`}>Details</Link>
            </td>
        </tr>
    );
}

export default memo(PatientListItem); // To avoid re-renderring the entire table, memoization is used.