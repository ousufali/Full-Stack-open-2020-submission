import React from 'react'
import Sumofexercise from './Sumofexercise'


const Header = ({ title }) => {

    return (
        <h2>{title}</h2>
    )
}
const Part = ({ name, numbers }) => {
    return (
        <div>
            <p>{name} {numbers}</p>
        </div>


    )
}
const Content = ({ parts }) => {
    // console.log(parts)
    return (
        <div>
            {parts.map((x) => <Part key={x.id} name={x.name} numbers={x.exercises} />)}
        </div>
    )
}


const Course = ({ course }) => {
    return (
       <> {course.map((x)=><Onecourse key = {x.id} cur = {x} />)} </>
    )
}

const Onecourse = ({cur})=>
{
    return (
        <div>
            <Header  title={cur.name} />
            <Content  parts={cur.parts} />
            <Sumofexercise  Parts={cur.parts} />
        </div>
    )
}


export default Course