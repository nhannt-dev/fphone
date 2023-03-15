import React, { memo, useEffect, useState } from 'react'
import { apiGetProducts } from '../apis/product'
import { Card } from './'
import Slider from "react-slick";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import path from '../ultils/path';

const Section = ({ catalog, title, spec, limit }) => {

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
    }
    if (!limit) {
        settings.rows = 1
        settings.slidesPerRow = 2
    }

    const [products, setProducts] = useState(null)
    const { wishlist } = useSelector(state => state.app)

    useEffect(() => {
        const fetchProducts = async () => {
            const params = {
                catalog: catalog,
            }
            params.limit = limit ? limit : 20
            if (spec) params.order = [['star', 'DESC']]
            const response = await apiGetProducts(params)
            if (response.err === 0) {
                setProducts(response.productDatas.rows)
            }
        }
        fetchProducts()
    }, [catalog])


    return (
        <div className='w-full flex flex-col mb-4'>
            <div className='w-full flex justify-between items-center mb-[10px]'>
                <h1 className='text-gray-600 text-[22px] font-semibold'>{title}</h1>
                <div className='flex gap-1'>
                    {/* {products
                        ?.map(item => item.brand)
                        ?.filter((item, index, self) => self.indexOf(item) === index)
                        ?.filter(i => !i === false)
                        ?.map(item => (
                            <span key={item} className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer'>
                                {item}
                            </span>
                        ))} */}
                    <Link to={`/${path.CATALOG}/${catalog}`} className='p-2 bg-gray-200 border border-gray-300 rounded-md cursor-pointer'>Xem tất cả</Link>
                </div>
            </div>
            <div className='w-full gap-3'>
                <Slider {...settings}>
                    {products?.map(item => (
                        <Card
                            key={item.id}
                            image={item.thumb}
                            name={item.name}
                            policy={item?.policy[0]}
                            price={item?.variants[0]?.price}
                            star={item?.star}
                            discountNumber={item?.discount}
                            id={item?.id}
                            wishlist={wishlist}
                        />
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default memo(Section)