import React, { memo, useState, useEffect } from 'react'
import icons from '../ultils/icons'
import { useDispatch, useSelector } from 'react-redux'
import actionTypes from '../store/actions/actionTypes'
import { apiUpdateCart } from '../apis'
import { toast } from 'react-toastify'


const { ImBin, AiFillCaretLeft, AiFillCaretRight } = icons
const OrderItem = ({ image, name, discount, price, pid }) => {
    const [quantity, setQuantity] = useState(1)
    // const { cart } = useSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: actionTypes.CAL_PRICE, product: { pid, price: (price - price * discount * 0.01) * quantity, quantity } })
    }, [quantity])
    useEffect(() => {
        dispatch({ type: actionTypes.CAL_PRICE, product: { pid, price: (price - price * discount * 0.01), quantity: 1 } })
    }, [])
    const updateCart = async () => {
        const response = await apiUpdateCart(pid)
        if (response.err === 0) {
            dispatch({ type: actionTypes.CART, cart: pid })
            dispatch({ type: actionTypes.DEL_ORDER, pid })
        }
    }
    return (
        <div className='p-4 rounded-md flex justify-between gap-2'>
            <div className='flex justify-between'>
                <img src={image} alt="product" className='w-[145px] h-[145px] object-cover rounded-md' />
                <div className='flex flex-col gap-4'>
                    <span className='font-bold'>
                        <span>{name}</span>
                    </span>
                    <div className='flex gap-4'>
                        <span className='text-main font-bold flex gap-1 items-center'>
                            <span className='text-base '>{Number(((price - price * discount * 0.01) * quantity).toFixed(1)).toLocaleString()}</span>
                            <span className='text-sm'>₫</span>
                        </span>
                        <span className='text-gray-500 line-through flex gap-1 items-center'>
                            <span className='text-sm '>{Number((price).toFixed(1)).toLocaleString()}</span>
                            <span className='text-xs'>₫</span>
                        </span>
                        <span className='bg-main rounded-md text-white text-sm px-2 py-1 font-semibold'>{`Giảm ${discount}%`}</span>
                    </div>
                    {/* <div className='flex flex-col mt-4 gap-1'>
                        <span className='font-semibold'>Mã giảm giá áp dụng:</span>
                        <span className=''>HOLI-12</span>
                    </div> */}
                </div>
            </div>
            <div className='flex flex-col items-end gap-8'>
                <span onClick={updateCart} className='cursor-pointer'><ImBin /></span>
                <div className='flex items-center gap-2'>
                    <span
                        className='cursor-pointer'
                        onClick={() => setQuantity(prev => prev <= 1 ? 1 : prev - 1)}
                    ><AiFillCaretLeft /></span>
                    <input
                        type="text"
                        className='w-[60px] px-4 border'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <span
                        className='cursor-pointer'
                        onClick={() => setQuantity(prev => prev + 1)}
                    ><AiFillCaretRight /></span>
                </div>
            </div>
        </div>
    )
}

export default memo(OrderItem)