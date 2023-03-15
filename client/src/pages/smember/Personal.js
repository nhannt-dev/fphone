import React, { useEffect, useState } from 'react'
import { InputField } from '../../components'
import { apiGetCurrent, apiUpdateCurrent } from '../../apis/user'
import moment from 'moment'
import 'moment/locale/vi'
import actionTypes from '../../store/actions/actionTypes'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import path from '../../ultils/path'

const Personal = () => {
    const dispatch = useDispatch()
    const [userData, setUserData] = useState(null)
    const [payload, setPayload] = useState({
        name: '',
        phone: '',
        address: ''
    })
    const fetchCurrent = async () => {
        const response = await apiGetCurrent()
        if (response.err === 0) setUserData(response.rs)
    }
    useEffect(() => {
        fetchCurrent()
    }, [])
    useEffect(() => {
        setPayload({
            name: userData?.name || 'Chưa cập nhật',
            phone: userData?.phone || 'Chưa cập nhật',
            address: userData?.address || 'Chưa cập nhật'
        })
    }, [userData])
    // console.log(userData);
    const handleUpdateUser = async () => {
        const data = {}
        Object.entries(payload).filter(item => (item[1] !== '' && item[1] !== 'Chưa cập nhật')).forEach(item => data[item[0]] = item[1])
        if (Object.keys(data).length > 0) {
            const response = await apiUpdateCurrent(data)
            if (response.err === 0) {
                dispatch({ type: actionTypes.UPDATE_CURRENT })
                toast.success(response.mes)
            }
            else toast.error(response.mes)
        } else {
            dispatch({
                type: actionTypes.ALERT,
                alert: 'Chưa có chỉnh sửa nào ~',
                callback: () => { dispatch({ type: actionTypes.ALERT, alert: '' }) }
            })
        }

    }
    return (
        <div className='flex flex-col items-center'>
            <img
                src="https://cdn2.cellphones.com.vn/213x213,webp,q100/media/wysiwyg/Shipper_CPS.jpg"
                alt="alert"
                className='w-[213px] h-[213px] object-cover m-auto'
            />
            <div className='flex flex-col gap-3 mt-4 w-[70%]'>
                <InputField
                    setValue={setPayload}
                    nameKey='name'
                    value={payload?.name}
                    preValue='Họ và tên: '
                />
                <InputField
                    value={userData?.email}
                    preValue='Email: '
                    onlyRead
                />
                <InputField
                    value={payload.address}
                    preValue='Địa chỉ: '
                    setValue={setPayload}
                    nameKey='address'
                />
                <InputField
                    value={payload.phone}
                    preValue='Số điện thoại: '
                    setValue={setPayload}
                    nameKey='phone'
                />
                <InputField
                    value={`${moment(userData?.createdAt).format('DD/MM/YY')} (${moment(userData?.createdAt).fromNow()})`}
                    preValue='Ngày tham gia Smember: '
                    onlyRead
                />
                <InputField
                    value={userData?.total || ''}
                    preValue='Tổng tiền đã mua sắm: 0'
                    onlyRead
                />
            </div>
            <button
                type='button'
                onClick={handleUpdateUser}
                className='w-[70%] py-2 mt-8 bg-main rounded-l-full rounded-r-full flex items-center justify-center font-semibold text-white'
            >
                Cập nhật thông tin
            </button>
            <div className='w-full flex justify-center mt-8'>
                <Link
                    to={`/${path.SMEMBER}/${path.CHANGE_PASS}`}
                    className='text-blue-500 hover:underline'
                >
                    Đổi mật khẩu
                </Link>
            </div>

        </div>
    )
}

export default Personal