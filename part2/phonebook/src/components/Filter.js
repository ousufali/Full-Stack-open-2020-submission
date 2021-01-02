import React from 'react'

const Filter = ({ search_name, set_search_name, person }) => {


    const handlesearchname = (event) => set_search_name(event.target.value);

    const findcontact = (to_search_contact) => {
        let x_name = to_search_contact.name.toLowerCase()
        let y_name = search_name.toLowerCase()
        if (x_name === y_name) {
        // if (x_name.includes(y_name)) {
            return (
                <div>
                    {to_search_contact.name} {to_search_contact.number}
                </div>
            )
        } 
    

}

const Result = () => {
    const result = person.filter((to_search_contact) => findcontact(to_search_contact))
    console.log("Filter shown with: ",{result})
    // console.log(result.name)
    if (result.length > 0) {
        return (
            <div>
                {result[0].name} {result[0].number}
            </div>
        )
    } else {
        return (
            <></>
        )
    }
}

return (
    < form >
        filter shown with
        <input placeholder = {'Enter name'} onChange={handlesearchname} >
        </input>
        <div>
            <Result />
        </div>
    </form >
)
}
export default Filter