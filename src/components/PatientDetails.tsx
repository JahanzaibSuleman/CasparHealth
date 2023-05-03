import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { usePatients } from '../contexts/PatientsContext';
import { Patient } from './props';

const PatientDetails: React.FC = () => {
    const { patientId } = useParams();
    const { patients, deletePatient } = usePatients();
    const [patient, setPatient] = useState<Patient>();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setPatient(patients.filter(pat => pat.patient_id.toString() === patientId)[0]);
    }, [patients]);

    const onDelete = () => {
        if (patientId) {
            deletePatient(patientId);
            navigate('/');
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { patient_id, first_name, last_name, email, gender, age, avatar } = patient || {};

    return (
        <>
            {patient ?
                <table>
                    <tbody>
                        <tr>
                            <td>{patient_id}</td>
                        </tr>
                        <tr>
                            <td>{first_name}</td>
                        </tr>
                        <tr>
                            <td>{last_name}</td>
                        </tr>
                        <tr>
                            <td>{email}</td>
                        </tr>
                        <tr>
                            <td>{gender}</td>
                        </tr>
                        <tr>
                            <td>{age}</td>
                        </tr>
                        <tr>
                            <td><img className='' src={avatar} /></td>
                        </tr>
                        <tr>
                            <td>
                                <Button variant="outlined" onClick={handleClickOpen}>
                                    Delete Patient
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                : <p>No Patient found</p>}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete patient"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Are you sure you want to delete ${patientId}?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={onDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );

};

export default PatientDetails;