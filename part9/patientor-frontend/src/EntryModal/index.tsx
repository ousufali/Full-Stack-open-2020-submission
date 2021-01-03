import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalEntryForm from './OccupationalHealthcareEntryForm'
import HealthCheckEntryForm from './HealtCheckEntryForm'

import { NewHospitalEntry, HealthCheckEntry, NewOccupationalHealthcareEntry, newEntry } from '../types'
type HealthCheckNewEntry = Omit<HealthCheckEntry, 'id'>;
type HospitalNewEntry = Omit<NewHospitalEntry, 'id'>;
type OccupationalHealthcareNewEntry = Omit<NewOccupationalHealthcareEntry, 'id'>;

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HospitalNewEntry | HealthCheckNewEntry | OccupationalHealthcareNewEntry) => void;
  error?: string;
  entryState: string
}



const AddPatientEntryModal = ({ modalOpen, onClose, onSubmit, error, entryState }: Props) => {
  console.log(entryState, "///");
  switch (entryState) {
    case "Hospital":
      return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
          <Modal.Header>Add a new entry</Modal.Header>
          <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <HospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
          </Modal.Content>
        </Modal>
      );
    case "Occupational":
      return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
          <Modal.Header>Add a new patient</Modal.Header>
          <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <OccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
          </Modal.Content>
        </Modal>
      );
    default:
      // "HealthCheck case proceeding"
      return (
        <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
          <Modal.Header>Add a new patient</Modal.Header>
          <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
          </Modal.Content>
        </Modal>
      );


  }



}

export default AddPatientEntryModal;
