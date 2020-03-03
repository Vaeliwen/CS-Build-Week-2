import React, {Component} from 'react'
import Player from './player'
import MoveButtons from './movebuttons'

class App extends Component {
    render() {
        return (
            <div>
                <Player />
                <MoveButtons />
            </div>
        )
    }
}

export default App