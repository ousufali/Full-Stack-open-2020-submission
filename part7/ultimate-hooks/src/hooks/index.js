import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        // const getResources = async () => {
        //     const response = await axios.get(baseUrl)
        //     setResources(response.data)
        // }
        // getResources()
        const data = service.get()
        setResources(data)
    }, [])



    const create = (resource) => {
        console.log("send data: ", resource)

        axios.post(baseUrl, resource)
            .then(response => response.data)

    }

    const get = async () => {
        const res = await axios.get(baseUrl)
        return res.data
    }
    const service = {
        create,
        get
    }

    return [
        resources, service
    ]
}

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}