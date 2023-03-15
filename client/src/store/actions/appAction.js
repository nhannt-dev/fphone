import actionTypes from "./actionTypes";
import * as apis from '../../apis'

export const getCatalogs = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCatalogs()
        if (response.err === 0) {
            dispatch({
                type: actionTypes.GET_CATALOG,
                data: response.catalogDatas
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATALOG,
            data: null
        })
    }
}

export const getBrands = () => async (dispatch) => {
    try {
        const response = await apis.apiGetBrands()
        if (response.err === 0) {
            dispatch({
                type: actionTypes.GET_BRAND,
                data: response.brandDatas
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_BRAND,
            data: null
        })
    }
}