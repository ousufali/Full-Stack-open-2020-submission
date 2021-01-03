
export interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

export interface WithDescription extends CoursePartBase {
    description: string;
}

export interface CoursePartOne extends WithDescription {
    name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

export interface CoursePartThree extends WithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

export interface MyDescriptedPart extends CoursePartBase {
    name: "alo wala";
    description: string;
    durationYear: number;
}


export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | MyDescriptedPart;
