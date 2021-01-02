import React from 'react'


const Sumofexercise = ({Parts})=>
{
    // console.log(Parts)
    return(
        <p>
            {'Total of '}
            {Parts.reduce((sum,part)=>
                {
                   return sum + part.exercises 
                },0)}
             {' exercises'}
        </p>
    )
}

export default Sumofexercise