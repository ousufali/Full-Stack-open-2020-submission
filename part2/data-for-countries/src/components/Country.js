import React, { useState } from 'react'

import Matching from './Matching'

const Country = ({ countries, name, setname }) => {
    // console.log("countries:  ", countries)
    const handlecountryname = (event) => setname(event.target.value)


    return (
        <div>

            <form>
                Find countries
            <input placeholder='Country name' onChange={handlecountryname} >
                </input>

                <div>
                    <Matching name={name} countries={countries} />
                </div>
            </form>
        </div>
    )

}

export default Country