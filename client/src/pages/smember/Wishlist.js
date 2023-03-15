import React, { useEffect, useState } from 'react'
import { Card } from '../../components'
import { useSelector } from 'react-redux'
import { apiGetDetailWishlist } from '../../apis'

const Wishlist = () => {
    const { wishlist } = useSelector(state => state.app)
    const [products, setProducts] = useState(null)
    // console.log(wishlist);
    const fetchDetailWishlist = async () => {
        const response = await apiGetDetailWishlist(wishlist)
        if (response.err === 0) setProducts(response.rs)
    }
    useEffect(() => {
        wishlist && fetchDetailWishlist()
    }, [wishlist])
    return (
        <div className='w-full'>
            <h3 className='font-bold text-[20px]'>Sản phẩm yêu thích của bạn</h3>
            <div className='flex gap-4 mt-8'>
                {products?.map(item => (
                    <div
                        key={item.id}
                        className='px-'
                    >
                        <Card
                            image={item.thumb}
                            name={item.name}
                            policy={item?.policy[0]}
                            price={item?.variants[0]?.price}
                            star={item?.star}
                            discountNumber={item?.discount}
                            id={item?.id}
                            isLike
                            voterCount={item?.votes?.length}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Wishlist