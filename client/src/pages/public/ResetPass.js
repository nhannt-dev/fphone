import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import path from '../../ultils/path'
import { apiResetPass } from '../../apis'
import { useDispatch } from 'react-redux'
import actionTypes from '../../store/actions/actionTypes'

const ResetPass = () => {
    const { token } = useParams()
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async () => {
        const response = await apiResetPass({ token, password })
        setPassword('')
        dispatch({
            type: actionTypes.ALERT, alert: response.mes, callback: () => {
                dispatch({ type: actionTypes.LOGOUT })
                navigate(`/${path.LOGIN}`)
            }
        })
    }
    return (
        <div className='py-8 min-h-screen flex flex-col justify-center items-center gap-4'>
            <div className='p-8 border rounded-md'>
                <img src='https://cdn2.cellphones.com.vn/213x213,webp,q100/media/wysiwyg/Shipper_CPS.jpg' alt="" className='w-[300px] object-contain' />
                <div className='flex flex-col gap-3'>
                    <label htmlFor="password" className='font-medium'>Nhập mật khẩu mới:</label>
                    <input
                        type="password"
                        className='py-2 px-4 rounded-md border bg-gray-100'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type='button'
                    className='py-2 px-4 rounded-md text-white bg-main font-semibold'
                    onClick={handleSubmit}
                >
                    Xác nhận
                </button>
            </div>
        </div>
    )
}

export default ResetPass