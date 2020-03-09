let initialState = {
    user: {
        fullname: '',
        genderId: '',
        address: '',
        cityId: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        confirmPass: ''
    },
    cityList: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_INPUT_CHANGE':
            return { ...state, user: { ...state.user, [action.payload.prop]: action.payload.value } }
        case 'CITY_LIST_FETCH_SUCCESS':
            return { ...state, cityList: action.payload }
        case 'REGISTER_INPUT_INITIAL':
            return initialState
        default:
            return state
    }
}