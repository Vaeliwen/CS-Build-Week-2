import React, {Component, useState} from 'react'
import connect from 'react-redux';
import MapNode from './MapNode'

export default function Map(props) {

    const [coords, setCoords] = useState([])
    const [id, setId] = useState([])

    setId(props.id)
    setCoords(props.coords)



    return (
        <div> 
        </div>
    )
}
