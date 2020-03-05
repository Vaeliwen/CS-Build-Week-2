import React from 'react';
import {connect} from 'react-redux'
import {fetchStatus, fetchLocation} from '../actions/'

const Player = (props) => {

    const getPlayer = (e) => {
        e.preventDefault();
        props.fetchStatus();
        props.fetchLocation();
    }

    let miner = "Nah"

    if (props.status.has_mined == true) {
        let miner = "Yup!"
    }
    return (
        <div >
            <h2>{props.status.name}</h2>
            <p>Strength: {props.status.strength}</p>
            <p>Speed: {props.status.speed}</p>
            <p>Encumbrance: {props.status.encumbrance}</p>
            <p>Gold: {props.status.gold}</p>
            <p>Bodywear: {props.status.bodywear}</p>
            <p>Footwear: {props.status.footwear}</p>
            <p>Inventory: {props.status.inventory}</p>
    <p>Has Mined?: {miner}</p>
            <div />
            <p>Location: {props.location.title} ID: {props.location.room_id}</p>
            <p>Description: {props.location.description}</p>
            <p>Items: {props.location.items.map(item => (
                <span>{item}</span>
            ))}</p>
            <p>Exits: {props.location.exits}</p>
            <p>Players: {props.location.players.map(player => (
                <span>{player}</span>
            ))}</p>
            <h3>Messages</h3>
            {props.location.messages.map(message => (
                <p>{message}</p>))}
            <button onClick={getPlayer}>Load Player Info</button>
        </div>
    )
}   

const mapStateToProps = state => {
    return {
        status: state.status,
        location: state.location
    }
}

export default connect(mapStateToProps, { fetchStatus, fetchLocation })(Player)