import React, { useEffect, useState } from 'react'
import icons from '../../ultils/icons'
import { apiGetDashBoard } from '../../apis/product'
import { ProductChart } from '../../components'
import { Doughnut } from 'react-chartjs-2';

const { HiUserGroup, BsCartFill, GrMoney } = icons
const Statitics = () => {
    const [data, setData] = useState(null)
    const [isMonth, setIsMonth] = useState(false)
    const fetchDashboard = async (params) => {
        const response = await apiGetDashBoard(params)
        if (response.err === 0) setData(response.rs)
    }

    useEffect(() => {
        const type = isMonth ? 'month' : 'day'
        fetchDashboard({ type })
    }, [isMonth])
    // console.log(data);

    return (
        <div>
            <div className='flex items-center justify-between border-b border-gray-800'>
                <h3 className='font-bold text-[30px] pb-4 '>Tổng quan</h3>
            </div>
            <div className='pt-8'>
                <div className='flex gap-4 items-center'>
                    <div className='flex-1 border bg-white rounded-md shadow-md flex p-4 items-center justify-between'>
                        <span className='flex flex-col'>
                            <span className='text-[24px] text-main'>{data?.visited}</span>
                            <span className='text-sm text-gray-500'>SỐ LƯỢT TRUY CẬP</span>
                        </span>
                        <HiUserGroup size={30} />
                    </div>
                    <div className='flex-1 border bg-white rounded-md shadow-md flex p-4 items-center justify-between'>
                        <span className='flex flex-col'>
                            <span className='text-[24px] text-main'>{data?.soldProducts}</span>
                            <span className='text-sm text-gray-500'>SẢN PHẨM ĐÃ BÁN</span>
                        </span>
                        <BsCartFill size={30} />
                    </div>
                    <div className='flex-1 border bg-white rounded-md shadow-md flex p-4 items-center justify-between'>
                        <span className='flex flex-col'>
                            <span className='text-[24px] text-main'>
                                <span >{Number((+data?.totals)?.toFixed(1)).toLocaleString()}</span>
                                <span className='pl-2' >₫</span>
                            </span>
                            <span className='text-sm text-gray-500'>TỔNG THU NHẬP</span>
                        </span>
                        <GrMoney size={30} />
                    </div>
                </div>
                <div className='flex gap-4 mt-8 bg-white'>
                    <div className='w-[70%] border shadow-md flex flex-col gap-4 relative rounded-md flex-auto p-4'>
                        <div className='flex items-center justify-between'>
                            <span className='font-bold'>Số sản phẩm đã bán theo ngày</span>
                            <span className='flex items-center gap-4'>
                                <button
                                    type='button'
                                    className={`px-4 py-2 rounded-md border hover:border-red-600 ${isMonth ? '' : 'text-white font-semibold bg-main'}`}
                                    onClick={() => setIsMonth(false)}
                                >
                                    Ngày
                                </button>
                                <button
                                    type='button'
                                    className={`px-4 py-2 rounded-md border hover:border-red-600 ${isMonth ? 'text-white font-semibold bg-main' : ''}`}
                                    onClick={() => setIsMonth(true)}
                                >
                                    Tháng
                                </button>
                            </span>
                        </div>
                        {data?.soldProducts && <ProductChart isMonth={isMonth} data={data?.soldChart} />}
                    </div>
                    <div className='w-[30%] bg-white flex-auto border shadow-md flex flex-col gap-4 relative rounded-md p-4'>
                        <span className='font-bold'>Trạng thái đơn hàng</span>
                        <span className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
                            <span className='flex flex-col text-sm gap-1 items-center justify-center font-bold'>
                                <span>Tổng đơn hàng</span>
                                <span>{data?.statusChart?.reduce((sum, el) => +el.statusBill + sum, 0)}</span>
                            </span>
                        </span>
                        <Doughnut
                            options={{
                                plugins: {
                                    legend: { position: 'bottom' }
                                }
                            }}
                            data={{
                                labels: data?.statusChart?.map(el => el.status),
                                datasets: [
                                    {
                                        data: data?.statusChart?.map(el => el.statusBill),
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 189, 60, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(255, 159, 64, 1)',
                                            'rgba(75, 192, 192, 1)',
                                        ],
                                        borderWidth: 1,
                                    }
                                ]
                            }}
                        />
                    </div>
                </div>
                <div className='mt-4 border shadow-md rounded-md p-4'>
                    <span className='font-bold'>Thông tin chi tiết các đơn hàng</span>
                    <div className='flex flex-col mt-4'>
                        <div className='flex items-center justify-center px-2 py-4 border-t'>
                            <span className='flex-1 font-medium'>Mã hóa đơn</span>
                            <span className='flex-1 font-medium flex justify-center'>Khách hàng</span>
                            <span className='flex-1 font-medium flex justify-center'>Tổng tiền mua</span>
                            <span className='flex-1 font-medium flex justify-end'>Trạng thái</span>
                        </div>
                        {data?.customer?.map(el => (
                            <div key={el.id} className='flex items-center justify-center px-2 py-4 border-t'>
                                <span className='uppercase flex-1'>{'#' + el.id.slice(0, 8)}</span>
                                <span className='flex-1 flex justify-center'>{el.customer.name}</span>
                                <span className='flex-1 flex justify-center'>{Number(el.total.toFixed(1)).toLocaleString()}</span>
                                <span className='flex-1 flex justify-end'>
                                    <div
                                        className={`w-[90px] ${el.status === 'Success' ? 'bg-green-500' : el.status === 'Pending' ? 'bg-orange-500' : 'bg-red-500'} py-1 flex items-center justify-center text-white `}
                                    >{el.status}</div>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statitics