import React from 'react';

export default function Player(props) {
    return (
        <div>
            <p>Name: {props.player.name}</p>
            <p>Strength: {props.player.strength}</p>
            <p>Speed: {props.player.speed}</p>
            <p>Encumbrance: {props.player.encumbrance}</p>
            <p>Gold: {props.player.gold}</p>
            <p>Bodywear: {props.player.bodywear}</p>
            <p>Footwear: {props.player.footwear}</p>
            <p>Inventory: {props.player.inventory}</p>
            <div />
            <p>Location: {props.location.title} ID: {props.location.room_id}</p>
            <p>Description: {props.location.description}</p>
            <p>Exits: {props.location.exits}</p>
        </div>
    )
}   
