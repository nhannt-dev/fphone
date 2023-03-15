import React, { memo } from 'react'
import icons from '../ultils/icons'
import discount from '../assets/discount.png'
import { useNavigate } from 'react-router-dom'
import { formatVietnameseToString, renderStar } from '../ultils/fn'
import { apiUpdateWishlist, apiUpdateCart } from '../apis/user'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import actionTypes from '../store/actions/actionTypes'

const { AiOutlineHeart, AiFillHeart, AiOutlineShoppingCart, MdOutlineRemoveShoppingCart } = icons

const Card = ({ name, price, image, policy, star, discountNumber, id, wishlist, isLike, voterCount }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.user)

    const updatewishlist = async () => {
        dispatch({ type: actionTypes.LOADING, flag: true })
        const response = await apiUpdateWishlist(id)
        dispatch({ type: actionTypes.LOADING, flag: false })
        if (response.err === 0) {
            dispatch({ type: actionTypes.UPDATE_CURRENT })
            toast.success(response.mes)
        }
        else toast.error(response.mes)
    }
    const updateCart = async () => {
        dispatch({ type: actionTypes.LOADING, flag: true })
        const response = await apiUpdateCart(id)
        dispatch({ type: actionTypes.LOADING, flag: false })
        if (response.err === 0) {
            dispatch({ type: actionTypes.UPDATE_CURRENT })
            dispatch({ type: actionTypes.CART, cart: id })
            toast.success(response.mes)
        }
        else toast.error(response.mes)
    }

    return (
        <div
            className='w-[228px] relative flex-initial mb-4 flex cursor-pointer flex-col gap-[10px] bg-white shadow-md rounded-md px-[10px] pt-[10px] pb-[30px]'
            onClick={() => navigate(`/${id}/${formatVietnameseToString(name)}`)}
        >
            {discountNumber > 5 && <img src={discount} alt="discount" className='absolute top-0 w-[80px] h-[31px] left-[-9px]' />}
            {discountNumber > 5 && <span className='absolute top-[5px] left-[2px] text-xs font-semibold text-white'>{`Giảm ${discountNumber}%`}</span>}
            <img src={image} alt="product" className='w-full h-[207px] object-cover' />
            <span className='text-sm font-bold text-gray-800 line-clamp-3 h-[65px]'>{name}</span>
            <span className='flex items-center gap-3'>
                <span className='flex gap-1 items-center text-red-600 font-bold'>
                    {price > 0
                        ? <>
                            <span className='text-base'>{Number((Math.round(price * 0.001) * 1000).toFixed(1)).toLocaleString()}</span>
                            <span className='text-xs'>₫</span>
                        </>
                        : 'Hết hàng'}
                </span>
                {(discountNumber > 5 && price > 0) && <span className='text-gray-500 line-through font-bold flex gap-1 items-center'>
                    <span className='text-sm '>{Number((Math.round((price + discountNumber * price * 0.01) / 1000) * 1000).toFixed(1)).toLocaleString()}</span>
                    <span className='text-xs'>₫</span>
                </span>}
            </span>
            <p className='line-clamp-2 bg-gray-100 text-gray-500 p-[5px] h-[44px] rounded-sm text-xs border border-gray-200'>{policy}</p>
            <span className='flex gap-2 items-center h-5'>
                <span className='flex'>
                    {renderStar(star)?.map((item, index) => (<span key={index}>{item}</span>))}
                </span>
                {voterCount && <span className='text-gray-500'>{`${voterCount} đánh giá`}</span>}
            </span>
            <div className='w-full items-center flex justify-between'>
                {cart && cart?.some(i => i === id)
                    ? <span
                        className='flex gap-2 items-center text-main  hover:text-main'
                        onClick={(e) => {
                            e.stopPropagation()
                            updateCart()
                        }}
                    >
                        <MdOutlineRemoveShoppingCart size={22} />
                        <span >Xóa giỏ</span>
                    </span>
                    : <span
                        className='flex gap-2 items-center hover:text-main'
                        onClick={(e) => {
                            e.stopPropagation()
                            updateCart()
                        }}
                    >
                        <AiOutlineShoppingCart size={22} />
                        <span>Giỏ hàng</span>
                    </span>}
                {!isLike && <span
                    onClick={(e) => {
                        e.stopPropagation()
                        updatewishlist()
                    }}
                    className='flex items-center gap-1'
                >
                    <span className='text-gray-700'>Yêu thích</span>
                    <span>
                        {wishlist?.some(i => i === id) ? <AiFillHeart size={22} color='red' /> : <AiOutlineHeart size={22} color='red' />}
                    </span>
                </span>}
            </div>
        </div>
    )
}

export default memo(Card)