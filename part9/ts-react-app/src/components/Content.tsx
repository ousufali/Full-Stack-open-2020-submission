import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};


const Part: React.FC<{ part: CoursePart }> = ({ part }) => {

    switch (part.name) {
        case 'Fundamentals':
            console.log(part);
            return (<div>
                <p>
                    name:
                    <b> {part.name}</b>
                    {"      exerciseCount:  "}
                    <b> {part.exerciseCount}</b>
                    {"      description:    "}
                    <b> {part.description}</b>
                </p>
            </div>);

        case 'Using props to pass data':
            console.log(part);

            return (<div>

                <p>
                    name:
                    <b>   {part.name}</b>
                    {"      exerciseCount:  "}
                    <b>  {part.exerciseCount}</b>
                    {"      groupProjectCount:  "}

                    <b> {part.groupProjectCount}</b>
                </p>
            </div>);

        case 'Deeper type usage':
            console.log(part);
            return (<div>
                <p>
                    name:
                    <b>  {part.name}</b>
                    {"      exerciseCount:  "}
                    <b>  {part.exerciseCount}</b>
                    {"      description:    "}
                    <b> {part.description}</b>
                    {"      "}
                    <b>  {part.exerciseSubmissionLink}</b>

                </p>
            </div>);

        case "alo wala":
            console.log(part);

            return (<div>
                <p>
                    name:
                    <b>   {part.name}</b>
                    {"      exerciseCount:  "}

                    <b>   {part.exerciseCount}</b>
                    {"      description:    "}
                    <b>   {part.description}</b>
                    {"      dyration year:"}
                    <b>   {part.durationYear}</b>

                </p>
            </div>);

        default:
            return (<p>not valid part</p>);

    }


}


const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {

    return (
        <div>
            {courseParts.map(part => <Part key={`${part.name}101`} part={part} />)}

        </div>

    )
}




export default Content;