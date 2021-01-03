/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, NewEntry, HealthCheckRating, Discharge } from '../src/types';

const isString = (param: any): param is string => {
    return typeof param === 'string' || param instanceof String;
};

const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
};
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};
const isUndefined = (param: any): param is undefined => {
    if (!param) {
        return true;
    }
    return false;
};


const parseStringValue = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name " + name);
    }
    return name;
};
const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date of birth " + date);
    }
    return date;
};
const parseSsn = (ssn: any): string | undefined => {

    if (isUndefined(ssn)) {
        return ssn;
    }
    if (!isString(ssn)) {
        throw new Error("Incorrect or missing name " + ssn);
    }
    return ssn;
};
const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender " + gender);
    }
    return gender;
};
const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation " + occupation);
    }
    return occupation;
};


const newPatientEntry = (object: any): NewPatient => {

    return {
        name: parseStringValue(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []

    };
};

const isHealthCheckRating = (value: number): value is HealthCheckRating => {
    if (value in HealthCheckRating) {
        return true;
    }
    return false;
};

const parseDiagnosisCodes = (diagnosisCodes: any): string[] => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const Codes: string[] = diagnosisCodes.map((code: any): string => {
        if (!isString(code)) {
            throw new Error("Invalid diagnosis code given");
        }
        return code;
    });
    return Codes;
};
const parseHealthCheckRating = (ratingValue: number): number => {
    if (!ratingValue || !isHealthCheckRating(ratingValue)) {
        throw new Error("Invalid or missing healthcheck rating value.");
    }
    return ratingValue;
};

const isDischarge = (value: any): value is Discharge => {
    if (!isString(value.date) || !isString(value.criteria)) {
        return false;
    }
    return true;
};

const parseDischargeData = (discharge: any): Discharge => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error("discharge object is missing or invalid.");
    }
    return discharge;
};
// interface SickLeave {
    
// }

const parseSickLeave = (sickLeave: any): {
    startDate: string,
    endDate: string
} => {
    console.log("checking sickLeave...");
    if (!sickLeave.startDate || !sickLeave.endDate || !isDate(sickLeave.startDate) || !isDate(sickLeave.endDate)) {
        throw new Error("Invalid or missing sickLeave object");
    }

    return {
        startDate: sickLeave.startDate,
        endDate: sickLeave.endDate
    };
};

export const newEntry = (object: any): NewEntry => {
    console.log("received body|",object);
    if (!object.type) {
        throw new Error("Entry type missing");
    }
    switch (object.type) {
        case "HealthCheck":
            if (!object.diagnosisCodes) {
                return {
                    type: object.type,
                    date: parseDate(object.date),
                    description: parseStringValue(object.description),
                    specialist: parseStringValue(object.specialist),
                    healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                };
            } else {
                return {
                    type: object.type,
                    date: parseDate(object.date),
                    description: parseStringValue(object.description),
                    specialist: parseStringValue(object.specialist),
                    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                    healthCheckRating: parseHealthCheckRating(object.healthCheckRating)

                };
            }

        case "Hospital":
            // console.log("in hospital");
            if (!object.diagnosisCodes) {
                return {
                    type: object.type,
                    date: parseDate(object.date),
                    description: parseStringValue(object.description),
                    specialist: parseStringValue(object.specialist),
                    discharge: parseDischargeData(object.discharge)
                };
            } else {
                return {
                    type: object.type,
                    date: parseDate(object.date),
                    description: parseStringValue(object.description),
                    specialist: parseStringValue(object.specialist),
                    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                    discharge: parseDischargeData(object.discharge)

                };
            }

        case "OccupationalHealthcare":
            if (!object.sickLeave) {
                if (!object.diagnosisCodes) {

                    return {
                        type: object.type,
                        date: parseDate(object.date),
                        description: parseStringValue(object.description),
                        specialist: parseStringValue(object.specialist),
                        employerName: parseStringValue(object.employerName)

                    };
                } else {
                    return {
                        type: object.type,
                        date: parseDate(object.date),
                        description: parseStringValue(object.description),
                        specialist: parseStringValue(object.specialist),
                        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                        employerName: parseStringValue(object.employerName)

                    };
                }
            } else {
                if (!object.diagnosisCodes) {
                    console.log("With sickLeave");
                    return {
                        type: object.type,
                        date: parseDate(object.date),
                        description: parseStringValue(object.description),
                        specialist: parseStringValue(object.specialist),
                        employerName: parseStringValue(object.employerName),
                        sickLeave: parseSickLeave(object.sickLeave)
                    };
                } else {
                    return {
                        type: object.type,
                        date: parseDate(object.date),
                        description: parseStringValue(object.description),
                        specialist: parseStringValue(object.specialist),
                        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
                        employerName: parseStringValue(object.employerName),
                        sickLeave: parseSickLeave(object.sickLeave)


                    };
                }
            }

        default:
            throw new Error("Given Entry type invalid");

    }
};

export default newPatientEntry;