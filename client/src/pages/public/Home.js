import React from 'react'
import { Sidebar, Section } from '../../components'


const Home = () => {

    return (
        <div className='w-main m-auto bg-gray-100 mt-[15px] p-[10px] text-sm text-gray-700'>
            <div className='flex gap-4'>
                <div className='w-[205px] flex-none bg-white rounded-lg shadow-lg'>
                    <Sidebar />
                </div>
                <img
                    src="https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/iphone-vang-sliding.png"
                    alt="banner"
                    className='flex-auto object-cover'
                />
            </div>
            <img
                src="https://dashboard.cellphones.com.vn/storage/special-desktop.png"
                alt="special desktop"
                className='my-[15px] w-full object-contain'
            />
            <Section spec catalog={'đien-thoai'} title='ĐIỆN THOẠI NỔI BẬT NHẤT' />
            <Section spec catalog={'laptop'} title='LAPTOP' />
            <Section spec catalog={'am-thanh'} title='ÂM THANH' />
            <Section spec catalog={'đong-ho'} title='ĐỒNG HỒ THÔNG MINH' />
            <Section spec catalog={'may-tinh-bang'} title='MÁY TÍNH BẢNG' />
            <Section spec catalog={'phu-kien'} title='PHỤ KIỆN' />
        </div>
    )
}

export default Home