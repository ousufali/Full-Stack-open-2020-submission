import diagnoses from '../../data/diagnoses.json';


import { Diagnose } from '../types';




const getDiagnosesData = (): Diagnose[] => {
    return diagnoses;
};





export default {
    getDiagnosesData
};