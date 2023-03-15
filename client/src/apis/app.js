import axios from '../axios'

export const apiGetCatalogs = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/catalogs'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetBrands = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/brand'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetCoupons = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/coupon'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})