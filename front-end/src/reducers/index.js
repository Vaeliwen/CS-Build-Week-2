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
    UPDATE_FAILURE
} from '../actions/'

const initialState = {
    map: {},
    err: '',
    isFetching: false,
    isMoving: false,
    isUpdating: false,
    location: {
        room_id: 0,
        title: "A Dark Room",
        description: "You cannot see anything.",
        coordinates: "(60,60)",
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
        inventory: []
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
                    coordinates: action.payload.coordinates,
                    exits: action.payload.exits,
                    messages: action.payload.messages
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
                    coordinates: action.payload.coordinates,
                    exits: action.payload.exits,
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
            const id = action.payload.room_id
            return {
                ...state,
                isUpdating: false,
                map: {
                    ...state.map,
                    [id]: {
                        room_id: action.payload.room_id,
                        title: action.payload.title,
                        description: action.payload.description,
                        coordinates: action.payload.coordinates,
                        exits: action.payload.exits
                    }
                }
            }
        case UPDATE_FAILURE:
            return {
                ...state,
                isUpdating: false,
                err: action.payload
            }
        default:
            return state
    }
}