import React, { useState, useEffect } from 'react'
import { OrderItem } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { apiClearCart, apiGetCurrent, apiBuy, apiGetCoupons } from '../../apis'
import actionTypes from '../../store/actions/actionTypes'
import { useNavigate } from 'react-router-dom'
import path from '../../ultils/path'

const Order = () => {
    const { cart } = useSelector(state => state.user)
    const { boughtProducts, sku } = useSelector(state => state.product)
    const [cartData, setCartData] = useState(null)
    const [buyer, setBuyer] = useState(null)
    const [coupons, setCoupons] = useState(null)
    const [selectedCoupon, setSelectedCoupon] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fetchCart = async () => {
        const response = await apiGetCurrent()
        if (response.err === 0) {
            setCartData(response.rs.cart)
            setBuyer(response.rs)
        }
    }
    console.log(boughtProducts);
    useEffect(() => {
        fetchCart()
    }, [cart])
    useEffect(() => {
        const fetchCoupons = async () => {
            const response = await apiGetCoupons()
            if (response.err === 0) setCoupons(response.coupons)
        }
        fetchCoupons()
    }, [])
    const handleBuy = async () => {
        if (!buyer?.address) {
            dispatch({
                type: actionTypes.ALERT, alert: 'Hãy cập nhật địa chỉ của bạn trước khi mua hàng', callback: () => {
                    navigate(`/${path.SMEMBER}/${path.PERSONAL}`)
                }
            })
        } else {
            const payload = {
                total: boughtProducts?.reduce((sum, el) => sum + el.price, 0),
                products: boughtProducts,
                coupon: selectedCoupon
            }
            const response = await apiBuy(payload)
            if (response.err === 0) {
                dispatch({ type: actionTypes.RESET_ORDER })
                // render
                const res = await apiClearCart()
                if (res.err === 0) dispatch({ type: actionTypes.UPDATE_CURRENT })
                dispatch({
                    type: actionTypes.ALERT,
                    alert: 'Mua hàng thành công. Cảm ơn bạn đã ủng hộ Shop ạ ~',
                    callback: () => navigate(`/${path.HOME}}`)
                })
            }
        }
    }
    return (
        <div className='flex items-center flex-col gap-4'>
            <h3 className='text-[20px] text-main font-bold'>Xác nhận mua hàng</h3>
            <div className='flex flex-col gap-2 w-full h-[60vh] overflow-y-auto'>
                {cartData?.map(item => (
                    <OrderItem
                        key={item.id}
                        image={item.thumb}
                        name={item.name}
                        price={item?.variants?.some(el => sku.some(sku => sku.value === el.sku))
                            ? item?.variants?.find(el => sku.some(sku => sku.value === el.sku)).price
                            : item?.variants[0]?.price}
                        discount={item.discount}
                        pid={item.id}
                    />

                ))}
            </div>
            <div className='w-full flex items-center gap-2'>
                <label className='font-bold' htmlFor="coupon">Mã giảm giá:</label>
                <select
                    id='coupon'
                    value={selectedCoupon}
                    onChange={e => setSelectedCoupon(e.target.value)}
                    className='px-4 py-2 border w-[300px]'
                >
                    <option value="">--Chọn--</option>
                    {coupons?.map(el => (
                        <option key={el.id} value={+el.id}>{`${el.code} - Giảm ${el.discount}% tổng hóa đơn`}</option>
                    ))}
                </select>
            </div>
            <span className='w-full flex items-center justify-between mt-2'>
                <span className='font-bold'>Tổng tiền hóa đơn:</span>
                <span className='font-bold flex gap-1 items-center'>
                    <span className='text-base '>{Number((Math.round(boughtProducts?.reduce((sum, el) => sum + el.price, 0) / 1000) * 1000).toFixed(1)).toLocaleString()}</span>
                    <span className='text-sm'>₫</span>
                </span>
            </span>
            <span className='w-full flex items-center justify-between mt-2'>
                <span className='font-bold'>Tổng tiền phải thanh toán <span className='text-xs italic'>{`(sau khi đã trừ mã giảm giá)`}</span>:</span>
                <span className='text-main font-bold flex gap-1 items-center'>
                    <span className='text-base '>
                        {Number((Math.round(boughtProducts?.reduce((sum, el) => sum + el.price, 0) * (1 - +coupons?.find(cp => cp.id === +selectedCoupon)?.discount / 100) / 1000) * 1000 || Math.round(boughtProducts?.reduce((sum, el) => sum + el.price, 0) / 1000) * 1000).toFixed(1)).toLocaleString()}
                    </span>
                    <span className='text-sm'>₫</span>
                </span>
            </span>
            <span className='w-full flex items-center justify-between'>
                <span className='font-bold'>Tên người mua:</span>
                <span className='flex gap-1 items-center'>{buyer?.name}</span>
            </span>
            <span className='w-full flex items-center justify-between'>
                <span className='font-bold'>Địa chỉ:</span>
                <span className=' flex gap-1 items-center'>{buyer?.address}</span>
            </span>
            <button
                type='button'
                className='py-3 bg-main text-white rounded-md w-full  font-bold'
                onClick={handleBuy}
            >
                Mua
            </button>
        </div>
    )
}

export default Order