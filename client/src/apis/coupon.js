import axios from '../axios'

export const apiGetCoupons = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/coupon/',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiCreateNewCoupon = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/v1/coupon/',
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiUpdateCoupon = (cid, data) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'put',
            url: '/api/v1/coupon/' + cid,
            data
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiDeleteCoupon = (cid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'delete',
            url: '/api/v1/coupon/' + cid,
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
