import React, { useState, useEffect } from 'react'
import contactServices from './components/services/contacts'
import Filter from './components/Filter'
import Personform from './components/Personform'
import Person from './components/Person'
import Notification from './components/Notification'



const App = () => {
    const [person, setperson] = useState([])
    const [newname, setnewname] = useState('')
    const [newnumber, setnewnumber] = useState('')
    const [search_name, set_search_name] = useState('')
    const [errormessage,seterrormessage] = useState(null)
    // const [effectrender, seteffectrender] = useState(false)

    // console.log(person.length)
    useEffect(() => {
        // console.log("Effect")

        contactServices
        .getall()
            .then(
                (returnedData) => {
                    console.log("getting data from server.....(done)")
                    setperson(returnedData)
                    // seteffectrender(false)

                }
            )

    }, [])



    return (
        <div>

            <h2>
                Phonebook
            </h2>
            <div>
            <Notification message={errormessage} />
            </div>

            <Filter search_name={search_name} set_search_name={set_search_name} person={person} />


            <h2>
                add a new
            </h2>
            {/* <Personform newname={newname} newnumber={newnumber} person={person} setnewname={setnewname} setnewnumber={setnewnumber} setperson={setperson} seteffectrender = {seteffectrender}/> */}

            <Personform newname={newname} newnumber={newnumber} person={person} setnewname={setnewname} setnewnumber={setnewnumber} setperson={setperson} seterrormessage = {seterrormessage} />


            <h2>
                Numbers
            </h2>
            <Person person={person} seterrormessage = {seterrormessage} />
        </div>
    )

}

export default App