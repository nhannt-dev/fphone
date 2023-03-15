import React, { useState } from 'react'
import { apiForgotPass } from '../../apis'
import { useDispatch } from 'react-redux'
import actionTypes from '../../store/actions/actionTypes'

const ChangePass = ({ forgot }) => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const handleSubmit = async () => {
        const response = await apiForgotPass({ email })
        dispatch({
            type: actionTypes.ALERT, alert: response.mes, callback: () => {
                dispatch({ type: actionTypes.ALERT, alert: '' })
            }
        })
    }
    return (
        <div className='w-full'>
            <h3 className='font-bold text-[20px]'>{`${forgot ? 'Quên mật khẩu' : 'Thay đổi mật khẩu'}`}</h3>
            <div className='flex flex-col gap-3 mt-8'>
                <label htmlFor="email" className='font-medium'>Nhập email của bạn:</label>
                <input
                    type="email"
                    className='py-2 px-4 rounded-md border bg-gray-100'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <button
                type='button'
                className='py-2 px-4 mt-4 rounded-md text-white bg-main font-semibold'
                onClick={handleSubmit}
            >
                Xác nhận
            </button>
        </div>
    )
}

export default ChangePass