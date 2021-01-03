import React from "react";
import { Grid, Button, Label, Divider } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, GenderOption, DiagnosisSelection } from "../AddPatientModal/FormField";
import { Gender, NewOccupationalHealthcareEntry } from "../types";
import { useStateValue } from '../state'


/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
// export type OccupationalEntryFormValues = Omit<Patient, "id" | "entries">;
type OccupationalHealthcareNewEntry = Omit<NewOccupationalHealthcareEntry, 'id'>;


interface Props {
  onSubmit: (values: OccupationalHealthcareNewEntry) => void;
  onCancel: () => void;
}

export const OccupationalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue()
  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [""],
        employerName: "",
        sickLeave_startDate: "",
        sickLeave_EndDate: ""
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const incorrectError = "incorrect date";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError
        }
        if (values.date.length > 7) {
          if (!Boolean(Date.parse(values.date))) {
            errors.date = incorrectError
          }
        } else {
          errors.date = incorrectError;

        }
        if (values.sickLeave_EndDate.length > 0) {
          if (values.date.length > 7) {
            if (!Boolean(Date.parse(values.sickLeave_EndDate))) {
              errors.sickLeave_EndDate = incorrectError
            }
          } else {
            errors.sickLeave_EndDate = incorrectError;

          }
        }
        if (values.sickLeave_startDate.length > 0) {
          if (values.sickLeave_startDate.length > 7) {
            if (!Boolean(Date.parse(values.sickLeave_startDate))) {
              errors.sickLeave_startDate = incorrectError
            }
          } else {
            errors.sickLeave_startDate = incorrectError;

          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}

            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="employerName"
              placeholder="employerName"
              name="employerName"
              component={TextField}
            />
            <Divider ></Divider>
            <Label >SickLeave</Label>
            <Field
              label="startDate"
              placeholder="YYYY-MM-DD"
              name="sickLeave_startDate"
              component={TextField}
            />
            <Field
              label="endDate"
              placeholder="YYYY-MM-DD"
              name="sickLeave_EndDate"
              component={TextField}
            />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OccupationalEntryForm;
