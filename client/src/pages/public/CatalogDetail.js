import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetProducts } from '../../apis/product'
import { Card } from '../../components'
import icons from '../../ultils/icons'
import { useSelector } from 'react-redux'
import { filters } from '../../ultils/constant'

const { AiFillCaretDown, BsSortDown, BsSortDownAlt, TbDiscount, AiFillEye } = icons

const CatalogDetail = () => {
    const { name } = useParams()
    const [products, setProducts] = useState(null)
    const [page, setPage] = useState(1)
    const { wishlist } = useSelector(state => state.app)
    const [sub, setSub] = useState(0)
    const [q, setQ] = useState('')
    const [order, setOrder] = useState(null)
    const [price, setPrice] = useState({ from: '', to: '' })
    const [isFilter, setIsFilter] = useState(false)
    useEffect(() => {
        const fetchProducts = async () => {
            const queries = { catalog: name }
            if (q) queries.q = q
            if (order === 3) queries.order = ['discount', 'DESC']
            if (order === 2) queries.price = 'up'
            if (order === 1) queries.price = 'down'
            if (!order) queries.order = ['views', 'DESC']
            if (price.from && price.to) queries.price = [+price.from, +price.to]
            const response = await apiGetProducts({ ...queries, page })
            if (response.err === 0) setProducts(response.productDatas)
            setSub(0)
            setPrice({ from: '', to: '' })
        }
        fetchProducts()
        window.scrollTo(0, 0)
    }, [name, q, order, isFilter, page])
    return (
        <div className='w-main m-auto relative bg-white mt-[30px] flex flex-col gap-8 min-h-screen'>
            <div className='flex flex-col'>
                <div className='flex items-center justify-between'>
                    <span className='text-[20px] font-bold'>Chọn theo tiêu chí</span>
                    <button
                        type='button'
                        className='px-4 py-2 rounded-md bg-main text-white font-bold border'
                        onClick={() => {
                            setIsFilter(false)
                            setQ('')
                            setOrder(null)
                            setPage(1)
                            setPrice({ from: '', to: '' })
                        }}
                    >
                        Clear filters
                    </button>
                </div>
                <div className='mt-4 flex flex-col gap-2 text-sm'>
                    <div className='flex items-center gap-2'>
                        <span>Giá: </span>
                        <input
                            className='px-4 py-2 rounded-md border outline-none'
                            type="number"
                            placeholder='từ'
                            value={price.from}
                            onChange={e => setPrice(prev => ({ ...prev, from: e.target.value }))}
                        />
                        <input
                            className='px-4 py-2 rounded-md border outline-none'
                            type="number"
                            placeholder='đến'
                            value={price.to}
                            onChange={e => setPrice(prev => ({ ...prev, to: e.target.value }))}
                        />
                        <button
                            type='button'
                            className='px-4 py-2 rounded-md bg-gray-100 border'
                            onClick={() => setIsFilter(prev => !prev)}
                        >
                            Tìm
                        </button>
                    </div>
                    <div className='flex items-center gap-4 mt-4'>
                        {filters.map(el => (
                            <div key={el.id} className='relative' >
                                <span
                                    className='px-4 py-2 rounded-md flex items-center justify-center gap-2 bg-gray-100 border cursor-pointer'
                                    onClick={() => setSub(prev => +prev !== 0 ? 0 : el.id)}
                                >
                                    {el.title}
                                    <AiFillCaretDown />
                                </span>
                                {sub === el.id && <div className='absolute z-50 border rounded-md left-0 right-[-150px] text-sm bg-white shadow-lg p-4 flex flex-wrap gap-2'>
                                    {el.subs.map((item, index) => (
                                        <span
                                            className='px-4 py-2 rounded-md bg-gray-100 border cursor-pointer'
                                            key={index}
                                            onClick={() => setQ(item)}
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <span className='text-[20px] font-bold'>Sắp xếp theo</span>
                <div className='mt-4 flex gap-2 text-sm'>
                    <span
                        className={`px-4 py-2 flex items-center justify-center gap-2 rounded-md border cursor-pointer ${order === 1 ? 'bg-main border-red-500 text-white' : 'bg-gray-100'}`}
                        onClick={() => setOrder(1)}
                    >
                        <BsSortDown size={20} />
                        <span>Giá cao - thấp</span>
                    </span>
                    <span
                        className={`px-4 py-2 flex items-center justify-center gap-2 rounded-md border cursor-pointer ${order === 2 ? 'bg-main border-red-500 text-white' : 'bg-gray-100'}`}
                        onClick={() => setOrder(2)}
                    >
                        <BsSortDownAlt size={20} />
                        <span>Giá thấp - cao</span>
                    </span>
                    <span
                        className={`px-4 py-2 flex items-center justify-center gap-2 rounded-md border cursor-pointer ${order === 3 ? 'bg-main border-red-500 text-white' : 'bg-gray-100'}`}
                        onClick={() => setOrder(3)}
                    >
                        <TbDiscount size={20} />
                        <span>Giảm giá nhiều</span>
                    </span>
                    <span
                        className={`px-4 py-2 flex items-center justify-center gap-2 rounded-md border cursor-pointer ${!order ? 'bg-main border-red-500 text-white' : 'bg-gray-100'}`}
                        onClick={() => setOrder(null)}
                    >
                        <AiFillEye size={20} />
                        <span>Xem nhiều</span>
                    </span>
                </div>
            </div>
            <div className='flex gap-4 flex-wrap w-full mt-8'>
                {products?.rows?.map(item => (
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
            </div>
            {products?.count && products?.rows?.length >= +process.env.REACT_APP_LIMIT_PRODUCTS && <div className='flex items-center justify-center'>
                <button
                    type='button'
                    className='w-[335px] py-2 bg-white rounded-md shadow-md border flex gap-2 items-center justify-center'
                    onClick={() => setPage(prev => prev + 1)}
                >
                    <span>{`Xem thêm ${products?.count - +process.env.REACT_APP_LIMIT_PRODUCTS * page} sản phẩm`}</span>
                    <AiFillCaretDown />
                </button>
            </div>}
        </div>
    )
}

export default CatalogDetail