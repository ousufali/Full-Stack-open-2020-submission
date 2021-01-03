export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
// export interface NewHealthCheckEntry extends BaseEntry {
//   type: "HealthCheck";
//   healthCheckRating: number;
// }
export interface NewHospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge_date: string;
  discharge_criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}
interface SickLeave {
  startDate: string
  endDate: string
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  employerName: string;
  sickLeave?: SickLeave;
}
export interface NewOccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  employerName: string;
  sickLeave_startDate: string;
  sickLeave_EndDate: string;
}

export type Entry = | HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type newEntry = Omit<HealthCheckEntry, 'id'> | Omit<NewHospitalEntry, 'id'> | Omit<NewOccupationalHealthcareEntry, 'id'>;