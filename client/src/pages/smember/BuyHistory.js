import React, { useEffect, useState } from 'react'
import { apiGetHistories } from '../../apis/user'

const BuyHistory = () => {
    const [histories, setHistories] = useState(null)
    const [detailOrder, setDetailOrder] = useState(null)
    useEffect(() => {
        const fetchHistories = async () => {
            const response = await apiGetHistories()
            if (response.err === 0) setHistories(response.mes)
        }
        fetchHistories()
    }, [])
    return (
        <div className='flex items-center flex-col gap-4'>
            <h3 className='text-[20px] w-full font-bold'>Lịch sử mua hàng</h3>
            <div className='w-full flex gap-2 items-center flex-col max-h-[50vh] overflow-y-auto'>
                {histories?.map(el => (
                    <div
                        key={el.id}
                        className='w-full border flex justify-around rounded-md shadow-sm p-4 cursor-pointer'
                        onClick={() => setDetailOrder(el)}
                    >
                        <span className='flex flex-col justify-center items-center w-full'>
                            <span className='text-[10px] text-blue-500'>Mã hóa đơn</span>
                            <span className='uppercase'>{`#${el.id.slice(0., 8)}`}</span>
                        </span>
                        <span className='flex flex-col justify-center items-center w-full'>
                            <span className='text-[10px] text-blue-500'>Số lượng sản phẩm</span>
                            <span className='uppercase'>{el?.billDetails?.reduce((sum, item) => sum + +item.quantity, 0)}</span>
                        </span>
                        <span className='flex flex-col justify-center items-center w-full'>
                            <span className='text-[10px] text-blue-500'>Tổng tiền</span>
                            <span className='uppercase'>{Number((Math.round((1 - el?.selectedCoupon?.discount * 0.01) * el.total / 1000) * 1000 || el?.total).toFixed(1)).toLocaleString() + ' vnđ'}</span>
                        </span>
                        <span className='flex flex-col justify-center items-center w-full'>
                            <span className='text-[10px] text-blue-500'>Mã giảm giá áp dụng</span>
                            <span className='uppercase'>{`${el?.selectedCoupon?.code || 'None'}${el?.selectedCoupon?.discount ? ` - Giảm ${el?.selectedCoupon?.discount}%` : ''}`}</span>
                        </span>
                        <span className='flex flex-col justify-center items-center w-full'>
                            <span className='text-[10px] text-blue-500'>Trạng thái</span>
                            <span className='uppercase'>{el?.status}</span>
                        </span>
                    </div>
                ))}
            </div>
            {detailOrder && <div className='w-full mt-4'>
                <h3 className='text-[30px] mb-4 w-full font-bold'>Chi tiết hóa đơn <span className='uppercase'>{`#${detailOrder.id.slice(0., 8)}`}</span></h3>
                <div className='flex gap-4 flex-wrap'>
                    {detailOrder?.billDetails?.map(el => (
                        <div
                            key={el.id}
                            className='flex gap-2 shadow-lg rounded-md p-4 w-full'
                        >
                            <img src={el?.products?.thumb} alt="" className='w-[150px] h-[150px] object-cover' />
                            <div className='flex flex-col'>
                                <span className='text-main'>{el?.products?.name}</span>
                                <span>{`Số lượng: ${el?.quantity}`}</span>
                                <span>{'Tổng giá: ' + Number(el?.price.toFixed(1)).toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    )
}

export default BuyHistory