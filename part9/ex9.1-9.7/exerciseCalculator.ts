
interface Parameter {
    dailyExerciseHour: Array<number>,
    targetExerciseHour: number
}

interface Result {
    periodLength: number,
    trainingDays: number,
    target: number,
    average: number,
    success: boolean,
    rating: number,
    ratingDescription: string
}



export const calculateExercises = (dailyExerciseHour: Array<number>, targetExerciseHour: number): Result => {


    const tDays = Number((dailyExerciseHour.filter(x => x !== 0)).length);
    let rtng: number;
    let description: string = '';
    let successValue: boolean = false;

    if (tDays < 2) {
        rtng = Number(1);
    } else if (tDays < 4) {
        rtng = Number(2);

    } else {
        rtng = Number(3);

    }
    switch (rtng) {
        case 1:
            description = "too bad, need to be improved";
            successValue = false;
            break;
        case 2:
            description = "not too bad but could be better";
            successValue = false;
            break;
        case 3:
            description = "Good, you are doing well";
            successValue = true;
            break;
    }

    return {
        periodLength: Number(dailyExerciseHour.length),
        trainingDays: tDays,
        target: targetExerciseHour,
        average: Number((dailyExerciseHour.reduce((acuumulator, value) => acuumulator + value, 0)) / dailyExerciseHour.length),
        success: successValue,
        rating: rtng,
        ratingDescription: description


    }

}

const parseArguments = (args: Array<string>): Parameter => {

    // console.log(args.length);
    if (args.length < 3) {
        throw new Error("arguments missing");
    }

    const targetExerciseHour: number = Number(args[2]);

    if (isNaN(targetExerciseHour)) {
        throw new Error("invalid targit exercise hour value");
    }
    let dailyExerciseHour: Array<number> = [];
    let i = 3;
    while (process.argv[i]) {
        let value = Number(process.argv[i]);
        if (!isNaN(value)) {
            dailyExerciseHour.push(value);
            i += 1;
        } else {
            throw new Error("invalid daily exercise hour given.");
        }
    }

    return {
        dailyExerciseHour,
        targetExerciseHour
    }

}



try {

    const { dailyExerciseHour, targetExerciseHour } = parseArguments(process.argv);
    let temp = calculateExercises(dailyExerciseHour, targetExerciseHour);
    console.log(temp);

} catch (error) {
    console.log("terminating, some error occured:   ", error);
}
