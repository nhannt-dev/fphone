import React, { memo } from 'react'

const VariantBtn = ({ price, name, image, isActived }) => {
    return (
        <div className={`p-4 border cursor-pointer ${isActived ? 'border-red-500' : 'border-gray-300'} rounded-md flex gap-2 items-center justify-center`}>
            <img src={image[0]} alt="color" className='w-[30px] h-[30px] object-cover' />
            <div className='flex justify-center text-xs flex-col'>
                <span className='font-semibold'>{name}</span>
                <span>{price}</span>
            </div>
        </div>
    )
}

export default memo(VariantBtn)