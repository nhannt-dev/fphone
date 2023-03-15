import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { apiGetProducts } from '../../apis'
import { useSelector, useDispatch } from 'react-redux'
import { Card } from '../../components'
import icons from '../../ultils/icons'
import actionTypes from '../../store/actions/actionTypes'

const { AiFillCaretDown, BsSortDown, BsSortDownAlt } = icons
const sorts = ['Liên quan', 'Giá cao', 'Giá thấp']
const Filter = () => {
    const [params] = useSearchParams()
    const dispatch = useDispatch()
    const [productData, setProductData] = useState(null)
    const [keyword, setKeyword] = useState('')
    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState(0)
    const [catalog, setCatalog] = useState(null)
    const { catalogs, wishlist } = useSelector(state => state.app)
    const fetchProducts = async (params) => {
        dispatch({ type: actionTypes.LOADING, flag: true })
        const response = await apiGetProducts(params)
        dispatch({ type: actionTypes.LOADING, flag: false })
        if (response.err === 0) setProductData(response.productDatas)
    }
    useEffect(() => {
        setCatalog(null)
        setKeyword('')
        setPage(0)
        setSortBy(0)
    }, [params])
    useEffect(() => {
        const paramsArr = []
        for (let entry of params.entries()) paramsArr.push(entry)
        const queries = {}
        paramsArr.forEach(i => {
            queries[i[0]] = i[1]
        })
        if (queries && queries.q) setKeyword(queries.q)
        if (sortBy === 1) queries.price = 'up'
        if (sortBy === 2) queries.price = 'down'
        if (catalog) queries.catalog = catalog
        fetchProducts({ ...queries, page })
    }, [params, page, sortBy, catalog])
    return (
        <div className='w-full relative bg-white mt-[30px] flex justify-center min-h-screen'>
            <div className='py-8 w-main'>
                <div className='w-full flex gap-1 justify-center'>
                    <span>Đã tìm thấy</span>
                    <span className='font-bold'>{productData?.count}</span>
                    <span>cho từ khóa tìm kiếm</span>
                    <span className='font-bold'>{`"${keyword}"`}</span>
                </div>
                <div className='flex flex-col gap-4 mt-8'>
                    <div className='flex gap-2 items-center'>
                        <span
                            onClick={() => setCatalog(null)}
                            className={`p-2 rounded-md font-semibold cursor-pointer ${!catalog ? 'text-main bg-[#fee] border' : 'bg-gray-200 border'}`}>Tất cả</span>
                        {catalogs?.map(item => (
                            <span
                                key={item.id}
                                onClick={() => setCatalog(item.value)}
                                className={`p-2 rounded-md font-semibold cursor-pointer ${catalog === item.value ? 'text-main bg-[#fee] border' : 'bg-gray-200 border'}`}
                            >{item.value}</span>
                        ))}
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h3 className='font-bold text-gray-700 text-[20px]'>Sắp xếp theo</h3>
                        <div className='flex items-center gap-3'>
                            {sorts.map((item, index) => (
                                <span
                                    className={`rounded-md cursor-pointer px-4 py-2 flex gap-1 items-center justify-center ${sortBy === index ? 'text-main bg-[#fee] border-red-400' : 'bg-gray-100 border'}`}
                                    key={index}
                                    onClick={() => setSortBy(index)}
                                >
                                    {index === 1 && <BsSortDown size={20} />}
                                    {index === 2 && <BsSortDownAlt size={20} />}
                                    <span> {item}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-wrap w-full mt-4'>
                        {productData?.rows?.map(item => (
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
                    {productData?.count && productData?.rows?.length >= +process.env.REACT_APP_LIMIT_PRODUCTS && <div className='flex items-center justify-center'>
                        <button
                            type='button'
                            className='w-[335px] py-2 bg-white rounded-md shadow-md border flex gap-2 items-center justify-center'
                            onClick={() => setPage(prev => prev + 1)}
                        >
                            <span>{`Xem thêm ${productData?.count - +process.env.REACT_APP_LIMIT_PRODUCTS * page} sản phẩm`}</span>
                            <AiFillCaretDown />
                        </button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Filter