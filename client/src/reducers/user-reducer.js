const userReducer = (state={}, action) => {
    switch(action.type) {
        case 'UPDATE_USERNAME': 
            state = {...state, name: action.payload}
            break;
        case 'SIGN_IN':
            state = {...state, signed: true}
        case 'SIGN_OUT':
            state = {...state, signed: false}
    }
    return state;
}

export default userReducer;