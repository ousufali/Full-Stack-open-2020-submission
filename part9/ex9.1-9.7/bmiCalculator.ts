
interface BodyMeasurements {
    weight: number,
    height: number
}

export const calculateBmi = (height: number, weight: number): string => {

    const result: number = weight / (Math.pow(height / 100, 2));

    if (result < 18.5) {
        return ("Underweight");
    } else if (result < 25) {
        return ("Normal (healthy weight)");
    } else {
        return ("Overweight");

    }

}

const parseArgument = (args: Array<string>): BodyMeasurements => {
    if (args.length < 4 || args.length > 4) {
        throw new Error("invalid arguments");
    }
    return {
        weight: Number(args[3]),
        height: Number(args[2])
    }
}


try {
    const { weight, height } = parseArgument(process.argv)
    console.log(calculateBmi(height, weight));

} catch (error) {
    console.log("terminating, some error appears:   ", error)
}


