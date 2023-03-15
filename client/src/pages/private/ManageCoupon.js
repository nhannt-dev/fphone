import React, { useEffect, useState } from 'react'
import icons from '../../ultils/icons'
import { apiCreateNewCoupon, apiGetCoupons, apiDeleteCoupon, apiUpdateCoupon } from '../../apis/coupon'
import moment from 'moment'
import { toast } from 'react-toastify'
import { InputField } from '../../components'

const { AiOutlinePlus } = icons

const ManageCoupon = () => {
    const [coupons, setCoupons] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [isCreate, setIsCreate] = useState(false)
    const [updateState, setUpdateState] = useState(false)
    const [payload, setPayload] = useState({
        code: '',
        discount: '',
        expiry: ''
    })
    useEffect(() => {
        const fetchCoupons = async () => {
            const response = await apiGetCoupons()
            if (response.err === 0) setCoupons(response.coupons)
        }

        !isEdit && fetchCoupons()
    }, [isEdit, isCreate, updateState])
    const handleUpdate = async () => {
        const response = await apiUpdateCoupon(isEdit, payload)
        if (response.err === 0) {
            setPayload({
                code: '',
                discount: '',
                expiry: ''
            })
            setIsEdit('')
        }
        toast.info(response.mes)

    }
    const handleDelete = async (cid) => {
        const response = await apiDeleteCoupon(cid)
        if (response.err === 0) setUpdateState(prev => !prev)
        toast.info(response.mes)
    }
    const handleEdit = (item) => {
        setIsEdit(item.id)
        setPayload({
            code: item.code,
            expiry: item.expiry,
            discount: item.discount
        })
    }
    const handleCreateNewCoupon = async () => {
        const response = await apiCreateNewCoupon(payload)
        if (response.err === 0) {
            setPayload({
                code: '',
                expiry: '',
                discount: ''
            })
        }
        toast.info(response.mes)
    }
    return (
        <div className='relative'>
            {isCreate && <div className='absolute top-0 bottom-0 left-0 right-0 bg-white'>
                <div className='flex items-center w-full justify-between border-b border-gray-800'>
                    <h3 className='font-bold text-[30px] pb-4 '>Tạo mới mã giảm giá</h3>
                    <button
                        type='button'
                        onClick={() => setIsCreate(false)}
                        className='py-2 px-4 bg-orange-600 rounded-md text-white font-semibold flex items-center justify-center gap-2'
                    >
                        <span>Quay lại</span>
                    </button>
                </div>
                <div className='py-8 w-[60%] flex-col m-auto flex gap-4'>
                    <InputField
                        value={payload.code}
                        setValue={setPayload}
                        nameKey='code'
                        preValue='Code mã giảm giá:'
                    />
                    <InputField
                        value={payload.discount}
                        setValue={setPayload}
                        nameKey='discount'
                        preValue='Discount:'
                    />
                    <InputField
                        value={payload.expiry}
                        setValue={setPayload}
                        nameKey='expiry'
                        preValue='Hết hạn sau:'
                    />
                    <button
                        type='button'
                        onClick={handleCreateNewCoupon}
                        className='py-2 px-4 bg-blue-600 w-fit rounded-md text-white font-semibold flex items-center justify-center gap-2'
                    >
                        <span>Create</span>
                    </button>
                </div>
            </div>}
            <div className='flex items-center justify-between border-b border-gray-800'>
                <h3 className='font-bold text-[30px] pb-4 '>Quản lý mã giảm giá</h3>
                <button
                    type='button'
                    onClick={() => {
                        setIsCreate(true)
                        setPayload({ code: '', discount: '', expiry: '' })
                    }}
                    className='py-2 px-4 bg-green-600 rounded-md text-white font-semibold flex items-center justify-center gap-2'
                >
                    <AiOutlinePlus size={18} />
                    <span>Create</span>
                </button>
            </div>
            <div className='py-4'>
                <table className="table-auto w-full mt-4">
                    <thead>
                        <tr className='border-b border-t'>
                            <td className='p-2 font-bold'>STT</td>
                            <td className='p-2 font-bold'>Code giảm giá</td>
                            <td className='p-2 font-bold'>Ngày tạo</td>
                            <td className='p-2 font-bold'>Ngày hết hạn</td>
                            <td className='p-2 font-bold'>Discount</td>
                            <td className='p-2 font-bold'>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons?.map((item, index) => (
                            <tr
                                key={item.id}
                            >
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{index + 1}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>
                                    {isEdit !== item.id
                                        ? <span>{item.code}</span>
                                        : <input
                                            type='text'
                                            className='border px-2 py-1 w-full'
                                            value={payload.code}
                                            onChange={e => setPayload(prev => ({ ...prev, code: e.target.value }))}
                                        />}
                                </td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>
                                    {isEdit !== item.id
                                        ? <span>{moment(item.expiry).format('DD/MM/YYYY')}</span>
                                        : <input
                                            type='date'
                                            className='border px-2 py-1 w-full'
                                            value={payload.expiry}
                                            onChange={e => setPayload(prev => ({ ...prev, expiry: e.target.value }))}
                                        />
                                    }</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>
                                    {isEdit !== item.id
                                        ? <span>{item.discount + '%'}</span>
                                        : <input
                                            type='text'
                                            className='border px-2 py-1 w-full'
                                            value={payload.discount}
                                            onChange={e => setPayload(prev => ({ ...prev, discount: e.target.value }))}
                                        />}
                                </td>
                                <td className='flex gap-2 pt-2'>
                                    {isEdit === item.id
                                        ? <span
                                            className='p-2 cursor-pointer text-main hover:underline'
                                            onClick={() => handleUpdate(item.id)}
                                        >Update</span>
                                        : <span
                                            className='p-2 cursor-pointer text-main hover:underline'
                                            onClick={() => handleEdit(item)}
                                        >Sửa</span>}
                                    <span
                                        className='p-2 cursor-pointer text-main hover:underline'
                                        onClick={() => handleDelete(item.id)}
                                    >Xóa</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageCoupon