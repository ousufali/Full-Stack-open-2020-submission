import express from 'express';
import patientServices from '../services/pateints';
import newPatientEntry, { newEntry } from '../utils';

import { Patient } from '../types';


const router = express.Router();



router.get('/', (_req, res) => {
    res.json(patientServices.getNonSensitivePatientData());
});

router.get('/:id', (req, res) => {
    try {
        const patient = patientServices.findPatientById(req.params.id);
        if (patient === undefined) {
            res.status(404).json({ error: "result not found" });
        }
        res.status(200).send(patient);
    } catch (e) {
        res.status(404);
    }

});

router.post('/', (req, res) => {
    try {
        const newPatienData = newPatientEntry(req.body);
        const newPatien: Patient = patientServices.addPatient(newPatienData);
        res.json(newPatien);

    } catch (e) {
        res.status(422).json(e);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        console.log("request recieved,  id:", req.params.id);
        const newEntryData = newEntry(req.body);
        console.log("newEntryData:", newEntryData, req.body);

        const patient = patientServices.updateEntry(req.params.id, newEntryData);

        res.status(200).json(patient);

    } catch (e ) {
        res.status(422).send(e);
    }
});


export default router;