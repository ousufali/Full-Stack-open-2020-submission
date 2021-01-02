import React from 'react'
import DeleteContact from './DeleteContact'

const Person = ({person,seterrormessage}) => {

    return (
        <div>
            {person.map((contact) => <p key={contact.name.length + Math.random()}> {contact.name}{"___"} {contact.number} {<DeleteContact person = {contact} seterrormessage = {seterrormessage}/>}</p>)}
            
        </div>

    )
}

export default Person