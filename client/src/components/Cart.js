import React, { memo, useEffect, useState } from 'react'
// import { apiGetDetailCart } from '../apis/product'
import { apiGetCurrent } from '../apis'
import { useSelector, useDispatch } from 'react-redux'
import { Card } from './'
import { useNavigate } from 'react-router-dom'
import path from '../ultils/path'
import actionTypes from '../store/actions/actionTypes'

const Cart = () => {
    const { cart } = useSelector(state => state.user)
    const { wishlist } = useSelector(state => state.app)
    const [cartData, setCartData] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fetchCart = async () => {
        const response = await apiGetCurrent()
        if (response.err === 0) setCartData(response.rs.cart)
    }
    useEffect(() => {
        if (cart && cart.length > 0) fetchCart()
    }, [cart])
    return (
        <div className='p-4 h-full flex flex-col'>
            <h3 className='font-bold text-[20px] flex-none h-[32px]'>Giỏ hàng của bạn</h3>
            <div className='w-full flex flex-auto flex-wrap mt-8 gap-2 overflow-y-auto'>
                {!cartData && <span>Bạn chưa có sản phẩm nào trong giở hàng</span>}
                {cartData && cartData?.map(item => (
                    <Card
                        key={item.id}
                        image={item.thumb}
                        name={item.name}
                        policy={item?.policy && item?.policy[0]}
                        price={item?.variants && item?.variants[0]?.price}
                        star={item?.star}
                        discountNumber={item?.discount}
                        id={item?.id}
                        wishlist={wishlist}
                    />
                ))}
            </div>
            <button
                type='button'
                className='w-full py-2 h-[50px] flex-none text-white font-semibold bg-main rounded-md'
                onClick={() => {
                    dispatch({ type: actionTypes.SHOW_CART, flag: false })
                    navigate(`/${path.SMEMBER}/${path.BUY}`)
                }}
            >
                Đi tới mua hàng
            </button>
        </div>
    )
}

export default memo(Cart)