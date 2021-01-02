import React from 'react'
import contactServices from './services/contacts'
import Notification from './Notification'

const deletecontact = (person,seterrormessage) => {

    // alert(`delete contact `)
    if (window.confirm(`Contact "${person.name}" will be deleted.`)) {
        return (

            contactServices
                .deletecontact(person.id)
                .then((returneddata) => {
                    // console.log("Delete data:", returneddata)
                    seterrormessage(`'${person.name}' Deleted`)
                    setInterval(() => {
                        seterrormessage(null)
                    }, 4000);
                    return (returneddata)
                })
                .catch(() => {
                    seterrormessage(`'${person.name}' not exist in server. Deletion cann't proceed.`)
                    setInterval(() => {
                        seterrormessage(null)
                    }, 4000);
                })

        )

    }
    return(<></>)

}

const DeleteContact = ({ person,seterrormessage }) => {


    // console.log("delete person id: = ", person.id)



    // console.log("deleteContact:....")

    return (
        <>

            <button onClick={() => deletecontact(person,seterrormessage)}>delete</button>
            {/* <form>
                <button type = "submit" onClick = {() => deletecontact(person)}>delete</button>
            </form> */}
        </>
    )

}

export default DeleteContact