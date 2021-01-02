import React from 'react'
import Weather from './Weather'

const Printcountry = ({ country }) => {
    console.log("result:", country)
    if (!country) {
        return (<div></div>)
    }
    return (
        <>
            <div>
                <h1>{country.name}</h1>
            </div>
            <div>
                Capital:  {country.capital}
            </div>
            <div>
                Population: {country.population}
            </div>
            <div>
                <h3>Languages</h3>
                {country.languages.map((x) => <li key={x.name}>{x.name} </li>)}
            </div>
            <div>
                <img width="150x" src={country.flag}></img>
            </div>

            <div>
                <Weather capital={country.capital} />
            </div>
        </>
    )
}
export default Printcountry