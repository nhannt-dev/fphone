import actionTypes from "../actions/actionTypes";


const initState = {
    catalogs: null,
    alert: '',
    callback: null,
    wishlist: [],
    isShowCart: false,
    isLoading: false,
    isAdmin: false,
    brands: null
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATALOG:
            return {
                ...state,
                catalogs: action.data
            }
        case actionTypes.ALERT:
            return {
                ...state,
                alert: action.alert,
                callback: action.callback || null
            }
        case actionTypes.ACTION_WISHLIST:
            return {
                ...state,
                wishlist: action.wishlist || []
            }
        case actionTypes.SHOW_CART:
            return {
                ...state,
                isShowCart: action.flag
            }
        case actionTypes.LOADING:
            return {
                ...state,
                isLoading: action.flag
            }
        case actionTypes.ADMIN:
            return {
                ...state,
                isAdmin: action.flag
            }
        case actionTypes.GET_BRAND:
            return {
                ...state,
                brands: action.data
            }
        default:
            return state;
    }
}

export default appReducer