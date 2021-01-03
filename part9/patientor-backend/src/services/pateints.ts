import initialPatientsData from '../../data/patientsData';
import { v4 as uuid } from 'uuid';

import { NonSensitivePatientData, NewPatient, Patient, Entry, NewEntry } from '../types';

let patientData: Patient[] = [...initialPatientsData];

const getNonSensitivePatientData = (): NonSensitivePatientData[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries

    })
    );
};

const addPatient = (newPatientData: NewPatient): Patient => {
    const newPatient: Patient = {
        id: uuid(),
        ...newPatientData
    };
    patientData.push(newPatient);
    return newPatient;

};

const findPatientById = (id: string): Patient | undefined => {
    const resultPatient = patientData.find(p => p.id === id);
    // console.log(resultPatient);
    return resultPatient;
};

const updateEntry = (id: string, data: NewEntry): Patient | undefined => {

    const resultPatient = patientData.find(p => p.id === id);
    const entry: Entry = { ...data, id: uuid() };
    if (resultPatient) {
        const updatedPatient = { ...resultPatient, entries: [...resultPatient?.entries, entry] };
        patientData = patientData.map(p => p.id === id ? updatedPatient : p);
        

        return updatedPatient;
    }
    return undefined;
};

export default {
    getNonSensitivePatientData,
    addPatient,
    findPatientById,
    updateEntry

};