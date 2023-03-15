import React, { useState, useEffect } from 'react'
import { apiLogin, apiRegister } from '../../apis/user'
import { useDispatch, useSelector } from 'react-redux'
import actionTypes from '../../store/actions/actionTypes'
import { useNavigate, useLocation } from 'react-router-dom'
import path from '../../ultils/path'
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        name: ''
    })
    const [isLogin, setIsLogin] = useState(() => location.state?.register ? false : true)
    const { isLoggedIn } = useSelector(state => state.auth)
    useEffect(() => {
        if (isLoggedIn)
            navigate('/')
    }, [isLoggedIn])
    const handleSubmit = async () => {
        if (isLogin) {
            const response = await apiLogin({ email: payload.email, password: payload.password })
            if (response.err === 0) {
                dispatch({ type: actionTypes.LOGIN, accessToken: response.accessToken, isLoggedIn: true })
                setPayload({
                    email: '',
                    password: '',
                    name: ''
                })
            } else {
                dispatch({
                    type: actionTypes.ALERT, alert: response.rs, callback: () => {
                        dispatch({ type: actionTypes.ALERT, alert: '' })
                    }
                })
            }
        } else {
            const response = await apiRegister(payload)
            if (response.err === 0) {
                dispatch({
                    type: actionTypes.ALERT,
                    alert: response.mes,
                    callback: () => {
                        dispatch({ type: actionTypes.ALERT, alert: '' })
                        navigate('/')
                    }
                })
                setPayload({
                    email: '',
                    password: '',
                    name: ''
                })
            }
        }
    }
    return (
        <div className='w-full h-[95vh] flex justify-center bg-white'>
            <div className='w-main flex'>
                <div className='w-2/5 flex-auto flex justify-center items-center'>
                    <img
                        src="https://cdn2.cellphones.com.vn/213x213,webp,q100/media/wysiwyg/Shipper_CPS.jpg"
                        alt="alert"
                        className='w-[213px] h-[213px] object-cover'
                    />
                </div>
                <div className='flex-auto flex flex-col justify-center gap-4 w-3/5'>
                    <h3 className='font-bold text-[24px]'>{isLogin ? 'Đăng nhập' : 'Đăng ký tài khoản'}</h3>
                    <input
                        type="text"
                        className='p-2 bg-gray-100 border rounded-md placeholder:italic placeholder:text-gray-700'
                        placeholder='Nhập email'
                        value={payload.email}
                        onChange={e => setPayload(prev => ({ ...prev, email: e.target.value }))}
                    />
                    <input
                        type="password"
                        className='p-2 bg-gray-100 border rounded-md placeholder:italic placeholder:text-gray-700'
                        placeholder='Nhập mật khẩu'
                        value={payload.password}
                        onChange={e => setPayload(prev => ({ ...prev, password: e.target.value }))}
                    />
                    {!isLogin && <input
                        type="text"
                        className='p-2 bg-gray-100 border rounded-md placeholder:italic placeholder:text-gray-700'
                        placeholder='Nhập tên của bạn'
                        value={payload.name}
                        onChange={e => setPayload(prev => ({ ...prev, name: e.target.value }))}
                    />}
                    <button
                        type='button'
                        className='px-4 py-2 bg-blue-500 text-white rounded-md font-semibold w-fit'
                        onClick={handleSubmit}
                    >
                        {isLogin ? 'Đăng nhập' : 'Đăng ký'}
                    </button>
                    <span className='flex gap-1'>
                        <span>{isLogin ? 'Bạn chưa có tài khoản?' : 'Đã có tài khoản?'}</span>
                        <span
                            className='text-blue-500 hover:underline cursor-pointer'
                            onClick={() => setIsLogin(prev => !prev)}

                        >{isLogin ? 'Đăng ký tài khoản' : 'Đăng nhập ngay'}</span>
                    </span>
                    <span
                        className='text-blue-500 hover:underline cursor-pointer'
                        onClick={() => navigate(`/${path.FORGOT_PASS}`)}

                    >Quên mật khẩu</span>
                </div>
            </div>
        </div>
    )
}

export default Login