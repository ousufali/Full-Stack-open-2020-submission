import express from 'express';
import diagnosesServices from '../services/diagnoses'

const Router = express.Router();


Router.get('/', (_req, res) => {
    res.json(diagnosesServices.getDiagnosesData());
});




export default Router;