import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../../components'

const Public = () => {
    const location = useLocation()
    return (
        <div className='w-full h-full relative'>
            <div
                // style={{ backgroundImage: 'url(https://res.cloudinary.com/dk55ktbpm/image/upload/v1673956133/bg-tet_vnhfr9.png)' }}
                className='w-full bg-repeat-y bg-contain relative bg-white'
            >
                <div className='fixed z-50 top-0 w-full bg-main shadow-xl text-white'>
                    <Header />
                    {/* {location.pathname !== '/' && <div className='w-full h-[30px] bg-white flex items-center justify-center text-black'>
                        <div className='w-main'>Breadcrumb</div>
                    </div>} */}
                </div>
                <div className='w-full h-full'>
                    <div className='w-full h-16'></div>
                    <div className='w-full h-full'>
                        <Outlet />
                    </div>
                    <div className='w-full mt-4 border-t bg-gray-100 text-xs flex justify-center py-6'>
                        <div className='w-main flex justify-between gap-4'>
                            <div className='flex flex-col flex-wrap gap-2'>
                                <h3 className='font-bold text-sm'>Tìm của hàng</h3>
                                <span>Tìm cửa hàng gần nhất</span>
                                <span>Mua hàng từ xa</span>
                                <span>Gặp trực tiếp cửa hàng gần nhất (Zalo hoặc gọi điện)</span>
                            </div>
                            <div className='flex flex-col flex-wrap gap-2'>
                                <span>Gọi mua hàng 1800.2097 (7h30 - 22h00)</span>
                                <span>Gọi khiếu nại 1800.2063 (8h00 - 21h30)</span>
                                <span>Gọi bảo hành 1800.2064 (8h00 - 21h00)</span>
                            </div>
                            <div className='flex flex-col flex-wrap gap-2'>
                                <span>Mua hàng và thanh toán Online</span>
                                <span>Mua hàng trả góp Online</span>
                                <span>Tra thông tin đơn hàng</span>
                                <span>Tra điểm Smember</span>
                                <span>Xem ưu đãi Smember</span>
                                <span>Tra thông tin bảo hành</span>
                                <span>Tra cứu hoá đơn điện tử</span>
                                <span>Trung tâm bảo hành chính hãng</span>
                                <span>Quy định về việc sao lưu dữ liệu</span>
                                <span>Dịch vụ bảo hành điện thoại</span>
                                <span>Dịch vụ bảo hành mở rộng</span>
                            </div>
                            <div className='flex flex-col flex-wrap gap-2'>
                                <span>Khách hàng doanh nghiệp (B2B)</span>
                                <span>  Ưu đãi thanh toán</span>
                                <span> Quy chế hoạt động</span>
                                <span> Chính sách Bảo hành</span>
                                <span>Liên hệ hợp tác kinh doanh</span>
                                <span>Tuyển dụng</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Public