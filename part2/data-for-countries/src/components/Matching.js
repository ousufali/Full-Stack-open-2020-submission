import React, { useState } from 'react'
import Printcountry from './Printcountry'


const Matching = ({ name, countries }) => {
    const [singleCountry, setSingleCountry] = useState('')
    const list = countries.filter((x) => x.name.toUpperCase().includes(name.toUpperCase()))
    const listlength = list.length


    const handleCountryChange = (Countryname) => {
        console.log(Countryname, "contry name")
        setSingleCountry(Countryname)
    }

    if (singleCountry !== '') {
        const countryToBeShow = list.find((c) => c.name === singleCountry)
        return (
            <div>
                <Printcountry country={countryToBeShow} />
            </div>
        )
    } else {

        if (listlength > 10 && name != '') {
            return (
                <div>
                    <p>Too many matches, specify another filter</p>
                </div>
            )
        } else {
            if (listlength === 1) {
                console.log("country::::", list[0])
                return (
                    <div>
                        <Printcountry key={list[0].area} country={list[0]} />
                    </div>
                )
            } else
                if (listlength < 11) {
                    return (
                        <div>
                            {list.map((x) => {
                                return (
                                    <div key={x.area}>
                                        {x.name}
                                        <button onClick={() => handleCountryChange(x.name)}> Show</button>
                                    </div>
                                )
                            })}
                        </div>
                    )
                } else {
                    return (<div></div>)
                }
        }
    }

}
export default Matching