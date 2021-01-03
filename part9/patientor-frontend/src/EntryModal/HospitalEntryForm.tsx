import React, { useState } from "react";
import { Grid, Button, Label, Divider } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, GenderOption, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { NewHospitalEntry, Discharge } from "../types";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
// export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

type HospitalNewEntry = Omit<NewHospitalEntry, 'id'>;
interface Props {
  onSubmit: (values: HospitalNewEntry) => void;
  onCancel: () => void;
}
;

export const HospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {

  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [""],
        discharge_date: "",
        discharge_criteria: ""



      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const incorrectError = "Field is incorrect";
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

        if (values.date.length > 7) {
          if (!Boolean(Date.parse(values.date))) {
            errors.date = incorrectError
          }
        } else {
          errors.date = incorrectError;

        }

        if (values.discharge_date.length > 9) {
          if (!Boolean(Date.parse(values.discharge_date))) {
            errors.discharge = incorrectError;
          }
        } else {
          errors.discharge_date = incorrectError;

        }

        if (!values.discharge_criteria) {
          errors.criteria = requiredError;
        }

        console.log("error||", errors, "error||");
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
            <Divider ></Divider>
            <Label >Discharge</Label>
            <Field
              label="date"
              placeholder="YYYY-MM-DD"
              name="discharge_date"
              component={TextField}
            />
            <Field
              label="criteria"
              placeholder="discharge_criteria"
              name="discharge_criteria"
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
          </Form >
        );
      }}
    </Formik >
  );
};

export default HospitalEntryForm;
