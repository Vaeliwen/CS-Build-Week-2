import React, { useState } from 'react';
import { connect } from 'react-redux'
import { move, updateMap, takeItem, sellItem, moveSmarter, dropItem, pray } from '../actions'
import Row from './Row'

function Buttons(props) {

    const [loot, setLoot] = useState('')
    const [predict, setPredict] = useState('0')
    const [map, setMap] = useState([])

    const handleNorth = (e) => {
        e.preventDefault()
        props.move("n")
    }

    const predictNorth = (e) => {
        e.preventDefault()
        props.moveSmarter("n", predict)
    }

    const handleSouth = (e) => {
        e.preventDefault()
        props.move("s")
    }

    const predictSouth = (e) => {
        e.preventDefault()
        props.moveSmarter("s", predict)
    }

    const handleEast = (e) => {
        e.preventDefault()
        props.move("e")
    }

    const predictEast = (e) => {
        e.preventDefault()
        props.moveSmarter("e", predict)
    }

    const handleWest = (e) => {
        e.preventDefault()
        props.move("w")
    }

    const predictWest = (e) => {
        e.preventDefault()
        props.moveSmarter("w", predict)
    }

    const mapUpdate = (e) => {
        e.preventDefault()
        props.updateMap()
        localStorage.setItem("map", JSON.stringify(props.map))
        localStorage.setItem("twodee", JSON.stringify(props.twodee))
        setMap(props.twodee.slice().reverse())
        }

    const yoink = (e) => {
        e.preventDefault()
        props.takeItem(loot)
    }

    const lootNamer = (e) => {
        e.preventDefault()
        setLoot(e.target.value)
    }

    const kaching = (e) => {
        e.preventDefault()
        props.sellItem(loot)
    }
    const meh = (e) => {
        e.preventDefault()
        props.dropItem(loot)
    }

    const predictor = (e) => {
        e.preventDefault()
        setPredict(e.target.value)
    }

    const lettucePray = (e) => {
        e.preventDefault()
        props.pray()
    }

    let rowStyle = {
        topMargin: '0px',
        bottomMargin: '0px'
    }


    return (
        <div>
            <button onClick={handleNorth}>North</button>
            <button onClick={handleSouth}>South</button>
            <button onClick={handleEast}>East</button>
            <button onClick={handleWest}>West</button>
            <br />
            <button onClick={predictNorth}>NWise</button>
            <button onClick={predictSouth}>SWise</button>
            <button onClick={predictEast}>EWise</button>
            <button onClick={predictWest}>WWise</button>
            <br />
            <button onClick={mapUpdate}>Write in your map!</button>
            <button onClick={lettucePray}>Kneel and pray!</button>
            <br />
            <button onClick={yoink}>YOINK!</button>
            <button onClick={meh}>Meh.</button>
            <button onClick={kaching}>Ka-Ching!</button>
            <input onChange={lootNamer} value={loot} type="text" />
            <input onChange={predictor} value={predict} type="text" />
            <br />
            <p>
                {map.map(row => {
                    if(row !== null){
                        return(
                        <Row data={row} style={rowStyle} />
                        )
                    }
                    else {
                        return null
                    }
                })}
            </p>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        location: state.location,
        map: state.map,
        twodee: state.twodee
    }
}

export default connect(mapStateToProps, { move, updateMap, takeItem, sellItem, moveSmarter, dropItem, pray })(Buttons)