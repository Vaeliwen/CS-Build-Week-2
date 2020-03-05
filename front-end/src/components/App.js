import React, {Component} from 'react'
import Player from './player'
import Buttons from './buttons'

class App extends Component {
    render() {
        return (
            <div>
                <Player />
                <Buttons />
            </div>
        )
    }
}

export default App