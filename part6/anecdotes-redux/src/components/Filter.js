import React from 'react'
import { connect } from 'react-redux'
import { setFilterQuery } from '../reducers/filterReducer'


const Filter = (props) => {

    // const dispatch = useDispatch()

    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        const query = event.target.value
        // dispatch(setFilterQuery(query))
        props.setFilterQuery(query)

    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    setFilterQuery
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)
export default ConnectedFilter