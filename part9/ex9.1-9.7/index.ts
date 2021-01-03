
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());


app.get('/hello', (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get('/bmi', (req, res) => {
    if (req.query.height === undefined || req.query.weight === undefined) {
        res.json({ error: "required parameters not given" });
    } else {

        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        if (isNaN(height) || isNaN(weight)) {
            res.status(400).json({ error: "malformatted parameters" });
        }
        // console.log(a,b);
        const result: string = calculateBmi(height, weight);
        res.json({
            weight: weight,
            height: height,
            bmi: result
        });
        // res.send(`response receive ${height},${weight}`);
    }
});

app.post('/exercises', (req, res) => {


    let proceed = true;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!req.body.daily_exercises || !req.body.target) {
        res.status(400).json({
            error: "parameters missing"
        });
    } else {

        // const dailyExerciseHour = req.body.daily_exercises;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const targetExerciseHour = Number(req.body.target);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        for (const x in req.body.daily_exercises) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (isNaN(Number(req.body.daily_exercises[x]))) {
                proceed = false;
                break;
            }
        }
        if (isNaN(targetExerciseHour)) {
            proceed = false;
        }

        if (proceed) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const result = calculateExercises(req.body.daily_exercises, targetExerciseHour);
            res.status(200).json({
                result
            });
        } else {
            res.status(400).json({
                error: "malformatted parameters"
            });
        }





    }
});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});