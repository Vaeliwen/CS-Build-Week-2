import React from 'react';
import { connect } from 'react-redux'
import { move } from '../actions'

function MoveButtons(props) {

    const handleNorth = (e) => {
        e.preventDefault()
        props.move("n")
    }

    const handleSouth = (e) => {
        e.preventDefault()
        props.move("s")
    }

    const handleEast = (e) => {
        e.preventDefault()
        props.move("e")
    }

    const handleWest = (e) => {
        e.preventDefault()
        props.move("w")
    }

    return (
        <div>
            <button onClick={handleNorth}>North</button>
            <button onClick={handleSouth}>South</button>
            <button onClick={handleEast}>East</button>
            <button onClick={handleWest}>West</button>
        </div>
    )

}

const mapStateToProps = state => {
    return {
        location: state.location
    }
}

export default connect(mapStateToProps, { move })(MoveButtons)