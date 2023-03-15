import React, { useEffect, memo, useState } from 'react'
import cellphoneLogo from '../assets/cellps.png'
import { Button, Search } from './'
import icons from '../ultils/icons'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { apiGetCurrent } from '../apis/user'
import actionTypes from '../store/actions/actionTypes'
import path from '../ultils/path'
import { useNavigate } from 'react-router-dom'
import { apiSecureAdminRoute } from '../apis/user'

const {
    CgMenuBoxed,
    HiOutlineLocationMarker,
    HiChevronDown,
    HiOutlinePhone,
    TbTruckDelivery,
    BsHandbag,
    BiUserCircle,
    BsCart4,
    AiOutlineLogout,
    GrUserAdmin
} = icons

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn } = useSelector(state => state.auth)
    const { isAdmin } = useSelector(state => state.app)
    const { updateCurrent, cart } = useSelector(state => state.user)
    const [username, setUsername] = useState(null)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const getCurrent = async () => {
        const response = await apiGetCurrent()
        if (response.err === 0) {
            setUsername(response.rs.name)
            dispatch({ type: actionTypes.ACTION_WISHLIST, wishlist: response.rs.wishlist })
            dispatch({ type: actionTypes.SET_CART, cart: response?.rs?.cart?.map(el => el.id) })
        } else {
            dispatch({ type: actionTypes.LOGIN })
        }
    }
    useEffect(() => {
        if (isLoggedIn) setTimeout(() => {
            getCurrent()
        }, 500)
    }, [isLoggedIn, updateCurrent])
    const fetchSecure = async () => {
        const response = await apiSecureAdminRoute()
        if (response.err === 0) {
            dispatch({ type: actionTypes.ADMIN, flag: true })
        } else {
            dispatch({ type: actionTypes.ADMIN, flag: false })
        }
    }
    useEffect(() => {
        setTimeout(() => {
            fetchSecure()
        }, 500)
    }, [isLoggedIn])
    return (
        <div className='w-main m-auto h-16 flex gap-[10px] items-center px-[10px]'>
            <Link to={'/'}>
                <img src={cellphoneLogo} alt="cellps logo" className='h-[28px] object-cover' />
            </Link>
            <Button
                text='Danh mục'
                styles='bg-[#DF3346] text-white px-2 h-[42px] text-xs font-semibold'
                iconBefore={<CgMenuBoxed size={25} />}
            />
            <Button
                text={<span className='flex flex-col items-start'><span className='text-[10px]'>Xem giá tại</span><span className='text-sm flex flex-nowrap'>Hồ Chí Minh</span></span>}
                styles='bg-[#DF3346] text-white px-2 h-[42px] text-xs font-semibold'
                iconBefore={<HiOutlineLocationMarker size={25} />}
                iconAfter={<HiChevronDown size={25} />}
            />
            <div className='flex-auto'>
                <Search />
            </div>
            <Button
                text={<span className='flex flex-col items-start'><span className='text-[10px]'>Gọi mua hàng</span><span className='text-xs'>0123456789</span></span>}
                styles='text-white h-[42px] text-xs'
                iconBefore={<HiOutlinePhone size={25} />}
            />
            <Button
                text={<span className='flex flex-col'><span>Cửa hàng</span><span>gần bạn</span></span>}
                styles='text-white h-[42px] text-xs'
                iconBefore={<HiOutlineLocationMarker size={25} />}
            />
            <Button
                text={<span className='flex flex-col'><span>Tra cứu</span><span>đơn hàng</span></span>}
                styles='text-white h-[42px] text-xs'
                iconBefore={<TbTruckDelivery size={25} />}
            />
            <span className='h-[42px] relative flex items-center cursor-pointer'>
                <Button
                    text='Giỏ hàng'
                    styles='text-white text-xs'
                    iconBefore={<BsHandbag size={35} />}
                    handleClick={() => dispatch({ type: actionTypes.SHOW_CART, flag: true })}
                />
                <span className='absolute top-[47%] left-[20%] text-[10px]'>{isLoggedIn ? cart?.length || 0 : 0}</span>
            </span>
            {
                !isLoggedIn ? <Button
                    text='Đăng nhập'
                    styles='bg-[#DF3346] px-2 py-2 text-white h-[42px] text-xs'
                    iconBefore={<BiUserCircle size={25} />}
                    handleClick={() => navigate(`/${path.LOGIN}`)}

                /> : <div
                    onClick={() => setIsShowMenu(prev => !prev)}
                    className='flex cursor-pointer text-sm px-2 py-2 rounded-md relative text-white h-[42px] flex-col'
                >
                    {isShowMenu && <div className='absolute top-full flex flex-col right-0 min-w-[150px] bg-white text-black shadow-md '>
                        <span
                            className='px-4 flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-200'
                            onClick={() => navigate(`/${path.SMEMBER}/${path.PERSONAL}`)}
                        >
                            <BsCart4 />
                            <span>Smember</span>
                        </span>
                        {isAdmin && <span
                            className='px-4 flex border-b items-center gap-2 py-2 cursor-pointer hover:bg-gray-200'
                            onClick={() => navigate(`/${path.SYSTEM}/${path.STATITICS}`)}
                        >
                            <GrUserAdmin />
                            <span>Admin</span>
                        </span>}
                        <span
                            className='px-4 flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-200'
                            onClick={() => dispatch({ type: actionTypes.LOGOUT })}
                        >
                            <AiOutlineLogout />
                            <span>Logout</span>
                        </span>
                    </div>}
                    <span>Xin chào,</span>
                    <span>{username}</span>
                </div>
            }
        </div>
    )
}

export default memo(Header)