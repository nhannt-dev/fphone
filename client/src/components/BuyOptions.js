import React, { memo, useState, useEffect } from 'react'
import { VariantBtn } from './'
import icons from '../ultils/icons'
import { apiUpdateCart, apiGetCurrent } from '../apis'
import { useNavigate } from 'react-router-dom'
import path from '../ultils/path'
import { useDispatch, useSelector } from 'react-redux'
import actionTypes from '../store/actions/actionTypes'

const { AiFillGift, MdOutlineAddShoppingCart, MdOutlineRemoveShoppingCart } = icons

const BuyOptions = ({ variants, discountNumber, setSku, sku, quantity, pid }) => {
    const [activeVariant, setActiveVariant] = useState(null)
    const { cart } = useSelector(state => state.user)
    useEffect(() => {
        variants && setActiveVariant(variants[0])
    }, [variants])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        setActiveVariant(variants?.find(item => item.sku === sku))
    }, [sku])
    const handleBuyClick = async () => {
        if (cart.some(el => el === pid)) {
            navigate(`/${path.SMEMBER}/${path.BUY}`)
        } else {
            const rs = await apiUpdateCart(pid)
            if (rs.err === 0) {
                dispatch({ type: actionTypes.CART, cart: pid })
                navigate(`/${path.SMEMBER}/${path.BUY}`)
            }
        }
    }
    const updateCart = async () => {
        dispatch({ type: actionTypes.LOADING, flag: true })
        const response = await apiUpdateCart(pid)
        dispatch({ type: actionTypes.LOADING, flag: false })
        if (response.err === 0) {
            dispatch({ type: actionTypes.UPDATE_CURRENT })
            dispatch({ type: actionTypes.CART, cart: pid })
        }
    }
    return (
        <div className='w-full'>
            <span className='flex items-center justify-between gap-3 mb-4'>
                <span className='flex items-center gap-3'>
                    <span className='flex gap-1 items-center text-red-600 font-bold'>
                        {activeVariant?.price > 0
                            ? <>
                                <span className='text-[18px]'>{Number((discountNumber > 5 ? activeVariant?.price - activeVariant?.price * discountNumber / 100 : activeVariant?.price).toFixed(1)).toLocaleString()}</span>
                                <span className='text-base'>₫</span>
                            </>
                            : 'Hết hàng'}
                    </span>
                    {(discountNumber > 5 && activeVariant?.price > 0) && <span className='text-gray-500 line-through font-bold flex gap-1 items-center'>
                        <span className='text-base '>{Number((activeVariant?.price).toFixed(1)).toLocaleString()}</span>
                        <span className='text-sm'>₫</span>
                    </span>}
                </span>
                <span>{`(Kho: ${quantity})`}</span>
            </span>
            <h3 className='font-bold text-[#444444] text-sm'>Chọn màu để xem giá</h3>
            <div className='flex flex-wrap gap-4 py-2 mb-2'>
                {variants?.map(item => (
                    <span key={item.sku} onClick={() => {
                        setSku(item.sku)
                        dispatch({ type: actionTypes.SKU, sku: { pid, value: item.sku } })
                    }}>
                        <VariantBtn
                            price={item?.price}
                            name={item?.name}
                            image={item?.images[0]}
                            isActived={activeVariant?.sku === item?.sku}
                        />
                    </span>
                ))}
            </div>
            <div className='mb-4'>
                <h3 className='bg-[#fee2e2] p-2 rounded-t-lg text-red-500 flex gap-2 items-center'>
                    <span><AiFillGift size={25} color='red' /></span>
                    <span className='font-base font-bold'>Khuyến mãi</span>
                </h3>
                <p className='p-2 pb-4 text-sm rounded-b-lg border border-[#fee2e2]'>Sản phẩm này không có khuyến mãi.</p>
            </div>
            <div className='flex items-center gap-2'>
                <button
                    type='button'
                    className='text-white bg-red-500 h-[60px] flex-auto font-bold rounded-md'
                    onClick={handleBuyClick}
                >
                    MUA NGAY
                </button>
                {!cart?.some(el => (el === pid))
                    ? <button
                        type='button'
                        onClick={(e) => {
                            e.stopPropagation()
                            updateCart()
                        }}
                        className='text-red-500 bg-white border-2 text-sm flex items-center justify-center border-red-500 w-[60px] h-[60px] flex-none rounded-md flex-col'
                    >
                        <span><MdOutlineAddShoppingCart size={25} color='red' /></span>
                        <span className='text-[8px] font-bold'>Thêm vào giỏ</span>
                    </button>
                    : <button
                        type='button'
                        onClick={(e) => {
                            e.stopPropagation()
                            updateCart()
                        }}
                        className='text-red-500 bg-white border-2 text-sm flex items-center justify-center border-red-500 w-[60px] h-[60px] flex-none rounded-md flex-col'
                    >
                        <span><MdOutlineRemoveShoppingCart size={25} color='red' /></span>
                        <span className='text-[8px] font-bold'>Xóa khỏi giỏ</span>
                    </button>}
            </div>
            <div className=' flex items-center gap-2 mt-4'>
                <button
                    type='button'
                    className='text-white bg-blue-500 h-[60px] flex-col flex justify-center items-center flex-auto font-bold rounded-md'
                >
                    <span>TRẢ GÓP 0%</span>
                    <span className='text-xs'>(Xét duyệt qua điện thoại)</span>
                </button>
                <button
                    type='button'
                    className='text-white bg-blue-500 h-[60px] flex-col flex justify-center items-center flex-auto font-bold rounded-md'
                >
                    <span>TRẢ GÓP QUA THẺ</span>
                    <span className='text-xs'>(Visa, Mastercard)</span>
                </button>
            </div>
        </div>
    )
}

export default memo(BuyOptions)