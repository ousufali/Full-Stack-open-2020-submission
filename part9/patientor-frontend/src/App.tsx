import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch, useParams } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnosisList } from "./state";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import PatientPage from './PatientPage';


const App: React.FC = () => {

  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        const response = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        const diagnosisList: Diagnosis[] = response.data;
        // console.log(patientListFromApi,"patientListFromApi")
        await dispatch(setDiagnosisList(diagnosisList));
        await dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);



  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>

            <Route path="/" exact>
              <PatientListPage />
            </Route>
            <Route path="/patients/:id" >
              <PatientPage />
            </Route>

          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
