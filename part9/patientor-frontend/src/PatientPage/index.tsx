import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useStateValue, updatePatient } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, NewHospitalEntry, HealthCheckEntry, NewOccupationalHealthcareEntry, newEntry } from "../types";


import { Icon, Button } from "semantic-ui-react";

import Entries from './Entries'


import AddPatientEntryModal from '../EntryModal'


const App: React.FC = () => {
    const [{ patients, diagnosis }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();


    const [addEntryOption, setAddEntryOption] = useState<string>("");
    const [modelOpen, setModelOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    const openModel = (): void => setModelOpen(true);
    const closeModal = (): void => {
        setModelOpen(false);
        setError(undefined)
    }

    type HealthCheckNewEntry = Omit<HealthCheckEntry, 'id'>;
    type HospitalNewEntry = Omit<NewHospitalEntry, 'id'>;
    type OccupationalHealthcareNewEntry = Omit<NewOccupationalHealthcareEntry, 'id'>;


    useEffect(() => {

        const fetchPatientList = async () => {
            try {
                const patientInState: Patient | undefined = Object.values(patients).find(p => p.id === id);
                if (!patientInState?.ssn) {


                    const { data: patient } = await axios.get<Patient>(
                        `${apiBaseUrl}/patients/${id}`
                    );
                    // console.log(patient, "patient find in back end")

                    await dispatch(updatePatient(patient));
                    // console.log(patients)
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchPatientList();
    }, [id]);

    const genderIcon = {
        male: { name: "mars" as "mars", color: "blue" as "blue" },
        female: { name: "venus" as "venus", color: "blue" as "blue" },
        other: { name: "genderless" as "genderless", color: "red" as "red" },
    };
    const patient: Patient = patients[id];


    // const addPatienEntry = async (values: HealthCheckNewEntry | HospitalNewEntry | OccupationalHealthcareNewEntry) => {
    const HealthCheckEntry = async (values: newEntry) => {
        console.log("newEntry values:", values)
        if (values.type === "Hospital") {
            console.log("aading hospital entry")
            const entry = {
                date: values.date,
                type: values.type,
                specialist: values.specialist,
                diagnosisCodes: values.diagnosisCodes,
                description: values.description,
                discharge: {
                    date: values.discharge_date,
                    criteria: values.discharge_criteria
                }
            }
            try {
                const { data: patient } = await axios.post<Patient>(
                    `${apiBaseUrl}/patients/${id}/entries`, entry
                );
                // console.log(patient, "patient find in back end")

                await dispatch(updatePatient(patient));
                closeModal();
            } catch (e) {
                console.error(e.response.data);
                setError(e.response.data.error);
            }
        }
        if (values.type === "OccupationalHealthcare") {
            let entry = {}
            if (values.sickLeave_EndDate.length < 1 || values.sickLeave_startDate.length < 1) {
                entry = {
                    date: values.date,
                    type: values.type,
                    specialist: values.specialist,
                    diagnosisCodes: values.diagnosisCodes,
                    description: values.description,
                    employerName: values.employerName,
                }
            } else {
                entry = {
                    date: values.date,
                    type: values.type,
                    specialist: values.specialist,
                    diagnosisCodes: values.diagnosisCodes,
                    description: values.description,
                    employerName: values.employerName,
                    sickLeave: {
                        startDate: values.sickLeave_startDate,
                        endDate: values.sickLeave_EndDate
                    }
                }

            }
            try {
                const { data: patient } = await axios.post<Patient>(
                    `${apiBaseUrl}/patients/${id}/entries`, entry
                );
                // console.log(patient, "patient find in back end")

                await dispatch(updatePatient(patient));
                closeModal();
            } catch (e) {
                console.error(e.response.data);
                setError(e.response.data.error);
            }
        }
        switch (values.type) {
            case "HealthCheck":
                console.log("adding healthcheck Entry");

                const entry = {
                    date: values.date,
                    type: values.type,
                    specialist: values.specialist,
                    diagnosisCodes: values.diagnosisCodes,
                    description: values.description,
                    healthCheckRating: values.healthCheckRating
                }
                try {
                    const { data: patient } = await axios.post<Patient>(
                        `${apiBaseUrl}/patients/${id}/entries`, entry
                    );
                    // console.log(patient, "patient find in back end")

                    await dispatch(updatePatient(patient));
                    closeModal();
                } catch (e) {
                    console.error(e.response.data);
                    setError(e.response.data.error);
                }



        }
    }
    const addHospitalEntry = () => {
        setAddEntryOption("Hospital");
        openModel()

    }
    const addOccupationalEntry = () => {
        setAddEntryOption("Occupational");
        openModel()
    }
    const addHealthCheckEntry = () => {
        setAddEntryOption("HealthCheck");
        openModel()
    }

    return (
        <div className="App">
            <h1>{patient?.name} <Icon {...genderIcon[patient?.gender]} /></h1>
            <div>
                <h4>  ssn:{" "}{patient?.ssn}</h4>
            </div>
            <div>
                <h4>occupation:{" "}{patient?.occupation}</h4>
            </div>
            <div>
                <h2>entries </h2>
                <Entries entries={patient?.entries} />
                <h2>add entries</h2>

                <Button onClick={addHospitalEntry} >Hospital Entry</Button>
                <Button onClick={addOccupationalEntry} >Occupational Entry</Button>
                <Button onClick={addHealthCheckEntry} >HealthCheck Entry</Button>

                <AddPatientEntryModal
                    modalOpen={modelOpen}
                    onSubmit={HealthCheckEntry}
                    error={error}
                    onClose={closeModal}
                    entryState={addEntryOption}
                />
            </div>
        </div >
    );

};

export default App;
