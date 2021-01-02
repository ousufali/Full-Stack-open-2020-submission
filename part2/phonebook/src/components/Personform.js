import React from 'react'
import contactServices from './services/contacts'

// const Personform = ({ newname, newnumber, person, setnewname, setnewnumber, setperson ,seteffectrender}) => {
const Personform = ({ newname, newnumber, person, setnewname, setnewnumber, setperson, seterrormessage }) => {

    const handle_name_change = (event) => {

        // console.log(event.target.value)
        setnewname(event.target.value)
    }
    const handel_number_change = (event) => {
        setnewnumber(event.target.value)
    }


    const addnewcontact = (event) => {

        event.preventDefault()
        var already_have = false

        const newobject = {
            name: newname,
            number: newnumber
        }

        // const already_have = person.filter((contact)=> contact.name === newname ? true :false)
        // console.log(already_have)
        // console.log(newname)
        let contactid;

        person.forEach((contact) => {
            if (contact.name === newname) {
                already_have = true
                contactid = contact.id;
            }
        })

        // console.log(already_have)
        // console.log(newname)

        if (!already_have) {
            contactServices
                .create(newobject)
                .then((returnedData) => {
                    setperson(person.concat(returnedData))
                    setnewname('')
                    setnewnumber('')

                    seterrormessage(`Added ${newname}`)
                    setInterval(() => {
                        seterrormessage(null)

                    }, 4000);

                })
        } else if (window.confirm(`'${newname}' is already added to phonebook, replace old number with new one?`)) {
            // alert(newname + ' is already added to phonebook');
            contactServices
                .update(contactid, newobject)
                .then((returnedData) => {
                    seterrormessage(`Updated ${newname}`)

                    setInterval(() => {
                        seterrormessage(null)

                    }, 4000);

                    return (returnedData)
                })
                .catch(()=>
                {
                    seterrormessage(`Not updated '${newname}', deleted from server`)

                    setInterval(() => {
                        seterrormessage(null)

                    }, 4000);

                })


        }


    }




    return (
        <form>
            <div>
                Name: <input value={newname} placeholder={'Enter name'} onChange={handle_name_change} />

            </div>
            <div>
                Number: <input value={newnumber} placeholder={'Enter number'} onChange={handel_number_change} />
            </div>

            <div>
                <button type="submit" onClick={addnewcontact} >
                    add
        </button>
            </div>

        </form>
    )
}

export default Personform