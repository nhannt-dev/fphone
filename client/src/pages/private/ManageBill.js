import React, { useEffect, useState } from 'react'
import { apiGetBills, apiChangeStatusBill } from '../../apis'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { formatVietnameseToString } from '../../ultils/fn'
import { toast } from 'react-toastify'

const ManageBill = () => {
    const [billdata, setBilldata] = useState(null)
    const [detailBill, setDetailBill] = useState(false)
    const [isChangeStatus, setIsChangeStatus] = useState(false)
    const [status, setStatus] = useState('')
    const fetchData = async () => {
        const response = await apiGetBills()
        if (response.err === 0) setBilldata(response.rs.rows)
    }
    useEffect(() => {
        !isChangeStatus && fetchData()
    }, [isChangeStatus])
    const handleSubmit = async () => {
        const response = await apiChangeStatusBill(status, isChangeStatus)
        if (response.err === 0) {
            toast.success('Cập nhật trạng thái đơn hàng thành công')
            setIsChangeStatus('')
        } else {
            toast.error('Cập nhật trạng thái đơn hàng thất bại')
        }
    }
    return (
        <div className='w-full h-full'>
            <div className='flex items-center justify-between border-b border-gray-800'>
                <h3 className='font-bold text-[30px] pb-4 '>Quản lý hóa đơn</h3>
                {isChangeStatus && <button
                    type='button'
                    className='bg-main rounded-md text-white font-semibold px-4 py-2'
                    onClick={handleSubmit}
                >
                    Update
                </button>}
            </div>
            <div className='flex flex-col mt-4'>
                <div className='flex items-center justify-center px-2 py-4 border-t'>
                    <span className='flex-1 font-medium'>Mã hóa đơn</span>
                    <span className='flex-1 font-medium flex justify-center'>Khách hàng</span>
                    <span className='flex-1 font-medium flex justify-center'>Tổng tiền mua</span>
                    <span className='flex-1 font-medium flex justify-center'>Sản phẩm mua</span>
                    <span className='flex-1 font-medium flex justify-center'>Mã giảm giá</span>
                    <span className='flex-1 font-medium flex justify-center'>Ngày chốt đơn</span>
                    <span className='flex-1 font-medium flex justify-end'>Trạng thái</span>
                </div>
                {billdata?.map(el => (
                    <div
                        key={el.id} className='flex items-center justify-center px-2 py-4 border-t hover:bg-gray-200 cursor-pointer'
                        onClick={() => setDetailBill(el)}
                    >
                        <span className='uppercase flex-1'>{'#' + el.id.slice(0, 8)}</span>
                        <span className='flex-1 flex justify-center'>{el.customer.name}</span>
                        <span className='flex-1 flex justify-center'>{Number((Math.round((1 - el?.selectedCoupon?.discount * 0.01) * el.total / 1000) * 1000 || el?.total).toFixed(1)).toLocaleString() + ' vnđ'}</span>
                        <span className='flex-1 flex justify-center'>{el?.billDetails?.length}</span>
                        <span className='flex-1 flex justify-center'>{`${el?.selectedCoupon?.code || 'None'} - Giảm ${el?.selectedCoupon?.discount || 0}%`}</span>
                        <span className='flex-1 flex justify-center'>{moment(el.createdAt).format('DD/MM/YYYY')}</span>
                        <span className='flex-1 flex justify-end'>
                            {isChangeStatus === el.id
                                ? <select className='border p-2' value={status} onClick={e => e.stopPropagation()} onChange={e => setStatus(e.target.value)} >
                                    <option value="Success">Success</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Pending">Pending</option>
                                </select>
                                : <div
                                    className={`w-[90px] cursor-pointer ${el.status === 'Success'
                                        ? 'bg-green-500' : el.status === 'Pending'
                                            ? 'bg-orange-500' : 'bg-red-500'} py-1 flex items-center justify-center text-white `}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsChangeStatus(el.id)
                                        setStatus(el.status)

                                    }}
                                >
                                    {el.status}
                                </div>}
                        </span>
                    </div>
                ))}
                {detailBill && <div className='pb-8'>
                    <h3 className='font-bold text-[18px] pt-8'>
                        <span>Chi tiết hóa đơn</span>
                        <span className='uppercase'>{'  #' + detailBill.id.slice(0, 8)}</span>
                    </h3>
                    <div className='flex flex-col mt-4'>
                        {detailBill?.billDetails?.map(el => (
                            <div key={el.id} className='p-4'>
                                <div className='flex gap-2'>
                                    <img src={el.products?.thumb} alt="" className='w-[100px] h-[100px] border rounded-md object-cover' />
                                    <div className='flex flex-col'>
                                        <Link
                                            className='font-semibold hover:underline cursor-pointer text-main'
                                            to={`/${el.pid}/${formatVietnameseToString(el.products.name)}`}
                                        >
                                            {el.products.name}
                                        </Link>
                                        <span className='flex gap-2'>
                                            <span className='font-medium'>Số lượng:</span>
                                            <span>{el.quantity}</span>
                                        </span>
                                        <span className='flex gap-2'>
                                            <span className='font-medium'>Tổng giá:</span>
                                            <span>{Number(el.price.toFixed(1)).toLocaleString() + ' vnđ'}</span>
                                        </span>
                                        <span className='flex gap-2'>
                                            <span className='font-medium'>Có giảm giá:</span>
                                            <span>{el.products?.discount + '%'}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default ManageBill