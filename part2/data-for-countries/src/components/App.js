import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Country from './Country'





const App = () => {

    const [countries, setcountries] = useState([])
    const [name, setname] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(
                (response) => {
                    console.log('Promise fulfilled', { response })
                    setcountries(response.data)
                }
            )
    }, [])


    return (

        <div>
            <h3>{process.env.REACT_APP_API_KEY}</h3>
            <Country countries={countries} name={name} setname={setname} />
            {/* {countries.map((coun)=><li key = {coun.name}> {coun.name}</li>)} */}
        </div>
    )

}

export default App