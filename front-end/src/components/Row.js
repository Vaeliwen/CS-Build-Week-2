import React from 'react';

export default function Row(props) {

    let whitespace = {
        fontSize: '10px',
        margin: '-2px',
        topPadding: '0px'
    }
    let locations = {
        fontSize: '10px',
        margin: '-2px',
        topPadding: '0px'
    }
    return (
        <div>
            <p>
                {props.data.map(item => {
                    if(item !== null){
                        if (item[0].toString().length === 1) {
                            return (
                                <span style={locations}> [00{item[0]}] </span>
                            )
                        }
                        
                        else if (item[0].toString().length === 2) {
                            return (
                    
                                <span style={locations}> [0{item[0]}] </span>
                            )
                        }
                        
                        else if (item[0].toString().length === 3) {
                            return (
                            
                                <span style={locations}> [{item[0]}] </span>
                            )
                        }
                    }
                    else {
                        return null
                
                            }
                        })}
            </p>
        </div>
    )
}