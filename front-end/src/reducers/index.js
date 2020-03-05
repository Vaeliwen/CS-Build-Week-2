import {
    MOVE_START,
    MOVE_SUCCESS,
    MOVE_FAILURE,
    FETCH_STATUS_START,
    FETCH_STATUS_SUCCESS,
    FETCH_FAILURE,
    FETCH_LOCATION_START,
    FETCH_LOCATION_SUCCESS,
    UPDATE_MAP,
    UPDATE_MAP_SUCCESS,
    UPDATE_FAILURE,
    TAKE_ITEM,
    TAKE_ITEM_SUCCESS,
    TAKE_ITEM_FAILURE,
    SELL_ITEMS,
    SELL_ITEMS_SUCCESS,
    SELL_ITEMS_FAILURE,
    DROP_ITEM,
    DROP_ITEM_SUCCESS,
    DROP_ITEM_FAILURE,
    PRAY,
    PRAY_SUCCESS,
    PRAY_FAILURE
} from '../actions/'

let map = new Array(150)

for(let i = 0; i < 150; i++){
    map[i] = new Array(150)
}
const initialState = {
    map: JSON.parse(localStorage.getItem("map")),
    // twodee: map,
    twodee: JSON.parse(localStorage.getItem("twodee")),
    err: '',
    shop_id: 1,
    isFetching: false,
    isMoving: false,
    isUpdating: false,
    isTaking: false,
    isSelling: false,
    isPraying: false,
    location: {
        room_id: 0,
        title: "A Dark Room",
        description: "You cannot see anything.",
        coordinates: [],
        players: [],
        items: [],
        exits: ["n", "s", "e", "w"],
        messages: []
    },
    status: {
        name: "None",
        encumbrance: 0,  // How much are you carrying?
        strength: 10,  // How much can you carry?
        speed: 10,  // How fast do you travel?
        gold: 0,
        bodywear: "None",
        footwear: "None",
        inventory: [],
        has_mined: false
    },
}

export function reducer(state = initialState, action){
    switch(action.type) {
        case FETCH_LOCATION_START:
            return {
                ...state,
                isFetching: true,
                err: ''
            }
        case FETCH_LOCATION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                location: {
                    room_id: action.payload.room_id,
                    title: action.payload.title,
                    description: action.payload.description,
                    coordinates: [action.payload.coordinates[0],action.payload.coordinates[1]],
                    exits: action.payload.exits,
                    items: action.payload.items,
                    players: action.payload.players,
                    messages: action.payload.messages,
                    has_mined: action.payload.has_mined
                }
            }
        case FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                err: action.payload
            }
        case FETCH_STATUS_START:
            return {
                ...state,
                isFetching: true,
                err: ''
            }
        case FETCH_STATUS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                status: {
                    name: action.payload.name,
                    encumbrance: action.payload.encumbrance,  // How much are you carrying?
                    strength: action.payload.strength,  // How much can you carry?
                    speed: action.payload.speed,  // How fast do you travel?
                    gold: action.payload.gold,
                    bodywear: action.payload.bodywear,
                    footwear: action.payload.footwear,
                    inventory: action.payload.inventory
                }
            }

        case MOVE_START:
            return {
                ...state,
                isMoving: true,
                err: ''
            }
        case MOVE_SUCCESS:
            return {
                ...state,
                isMoving: false,
                location: {
                    room_id: action.payload.room_id,
                    title: action.payload.title,
                    description: action.payload.description,
                    coordinates: [action.payload.coordinates[1],action.payload.coordinates[3]],
                    exits: action.payload.exits,
                    items: action.payload.items,
                    players: action.payload.players,
                    messages: action.payload.messages
                }
            }
        case MOVE_FAILURE:
            return {
                ...state,
                isMoving: false,
                err: action.payload
            }
        case UPDATE_MAP:
            return {
                ...state,
                isUpdating: true,
                err: ''
            }
        case UPDATE_MAP_SUCCESS:
            let splitStrings = action.payload.coordinates.split(',')
            let coords = [splitStrings[0].slice(1), splitStrings[1].slice(0, splitStrings[1].length -1)]
            let newState = {
                ...state,
                isUpdating: false,
                map: {
                    ...state.map,
                    [action.payload.room_id]: {
                        room_id: action.payload.room_id,
                        title: action.payload.title,
                        description: action.payload.description,
                        coordinates: coords,
                        exits: action.payload.exits
                    }
                },
                twodee: [
                    ...state.twodee
                ]
            }
            newState.twodee[coords[1]][coords[0]] = [action.payload.room_id, action.payload.exits]
            return newState
        case UPDATE_FAILURE:
            return {
                ...state,
                isUpdating: false,
                err: action.payload
            }
        case TAKE_ITEM:
            return {
                ...state,
                isTaking: true,
                err: ''
            }
        case TAKE_ITEM_SUCCESS:
            return {
                ...state,
                isTaking: false,
                location: {
                    ...state.location,
                    room_id: action.payload.room_id,
                    title: action.payload.title,
                    description: action.payload.description,
                    coordinates: action.payload.coordinates,
                    exits: action.payload.exits,
                    items: action.payload.items,
                    players: action.payload.players,
                    messages: action.payload.messages
                }
            }
        case TAKE_ITEM_FAILURE:
            return {
                ...state,
                isTaking: false,
                err: action.payload
            }
        case SELL_ITEMS:
            return {
                ...state,
                isSelling: true,
                err: ''
            }
        case SELL_ITEMS_SUCCESS:
            return {
                ...state,
                isSelling: false,
                location: {
                    ...state.location,
                    room_id: action.payload.room_id,
                    title: action.payload.title,
                    description: action.payload.description,
                    coordinates: [action.payload.coordinates[1],action.payload.coordinates[3]],
                    exits: action.payload.exits,
                    items: action.payload.items,
                    players: action.payload.players,
                    messages: action.payload.messages
                }
            }
        case SELL_ITEMS_FAILURE:
            return {
                ...state,
                isSelling: false,
                err: action.payload
            }
        case DROP_ITEM:
            return {
                ...state,
                isTaking: true,
                err: ''
            }
        case DROP_ITEM_SUCCESS:
            return {
                ...state,
                isTaking: false,
                location: {
                    ...state.location,
                    room_id: action.payload.room_id,
                    title: action.payload.title,
                    description: action.payload.description,
                    coordinates: [action.payload.coordinates[1],action.payload.coordinates[3]],
                    exits: action.payload.exits,
                    items: action.payload.items,
                    players: action.payload.players,
                    messages: action.payload.messages
                }
            }
        case DROP_ITEM_FAILURE:
            return {
                ...state,
                isTaking: false,
                err: action.payload
            }            
        default:
            return state
        case PRAY:
            return {
                ...state,
                isPraying: true,
                err: ''
            }
        case PRAY_SUCCESS:
            return {
                ...state,
                isPraying: false,
                location: {
                    ...state.location,
                    room_id: action.payload.room_id,
                    title: action.payload.title,
                    description: action.payload.description,
                    coordinates: [action.payload.coordinates[1],action.payload.coordinates[3]],
                    exits: action.payload.exits,
                    items: action.payload.items,
                    players: action.payload.players,
                    messages: action.payload.messages
                }
            }
        case PRAY_FAILURE:
            return {
                ...state,
                isPraying: false,
                err: action.payload
            }
    }
}