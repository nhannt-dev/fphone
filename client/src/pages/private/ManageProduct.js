import React, { useEffect, useState } from 'react'
import icons from '../../ultils/icons'
import { apiGetProductsAdmin, apiDeleteProduct } from '../../apis/product'
import { useDispatch } from 'react-redux'
import actionTypes from '../../store/actions/actionTypes'
import moment from 'moment'
import { InsertProduct, EditImagesProduct } from '../../components'
import { toast } from 'react-toastify'

const { AiOutlinePlus, AiFillStar, AiFillCaretDown, AiFillCamera } = icons
const cols = [
    'PID',
    'Tên sản phẩm',
    'Brand',
    'Catalog',
    'Star',
    'Voters',
    'Discount',
    'Đã bán',
    'Kho',
    'CreatedAt',
    'Actions'
]

// ADD VARIANTS + INFYNITY SCROLL + SORT BY
const ManageProduct = () => {
    const [products, setProducts] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [isEditImage, setIsEditImage] = useState(null)
    const [isCreate, setIsCreate] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [update, setUpdate] = useState(false)
    const [page, setPage] = useState(1)

    const dispatch = useDispatch()
    const fetchProducts = async () => {
        dispatch({ type: actionTypes.LOADING, flag: true })
        const response = await apiGetProductsAdmin({ page: page })
        dispatch({ type: actionTypes.LOADING, flag: false })
        if (response.err === 0) setProducts(response.productDatas)
    }
    useEffect(() => {
        !isEdit && fetchProducts()
    }, [isEdit, page, update])
    const handleUpdate = (product) => {
        setIsEdit(true)
        setEditingProduct(product)
    }
    const handleDeleteProduct = async (id) => {
        const response = await apiDeleteProduct(id)
        if (response.err === 0) {
            toast.success(response.mes)
            setUpdate(prev => !prev)
        } else toast.error(response.mes)
    }

    return (
        <div className='relative'>
            {isEdit && <div className='absolute top-0 bottom-0 left-0 right-0 bg-white'>
                <InsertProduct
                    product={editingProduct}
                    setIsEdit={setIsEdit}
                />
            </div>}
            {isCreate && <div className='absolute top-0 bottom-0 left-0 right-0 bg-white'>
                <InsertProduct
                    product={editingProduct}
                    setIsCreate={setIsCreate}
                />
            </div>}
            {isEditImage && <EditImagesProduct isEditImage={isEditImage} setIsEditImage={setIsEditImage} />}
            <div className='flex items-center justify-between border-b border-gray-200'>
                <h3 className='font-bold text-[30px] pb-4 '>Quản lý sản phẩm</h3>
                <button
                    type='button'
                    onClick={() => {
                        setEditingProduct(null)
                        setIsCreate(true)
                    }}
                    className='py-2 px-4 bg-green-600 rounded-md text-white font-semibold flex items-center justify-center gap-2'
                >
                    <AiOutlinePlus size={18} />
                    <span>Create</span>
                </button>
            </div>
            <div className='py-4'>
                <div>
                    <span className='font-bold'>Sort by:</span>
                </div>
                <table className="table-auto w-full mt-4">
                    <thead>
                        <tr className='border-b border-t'>
                            {cols.map((el, index) => (
                                <td key={index} className='p-2 font-bold'>{el}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {products?.rows?.map((item, index) => (
                            <tr
                                key={item.id}
                            >
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{index + 1}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item.name}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item.brand}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item.catalog}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} flex items-center`}>
                                    <span>{item.star}</span>
                                    <AiFillStar color='#f59e0b' />
                                </td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item.votes.length}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item.discount + '%'}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item.boughtProducts?.reduce((sum, el) => sum + el.quantity, 0)}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{item.quantity}</td>
                                <td className={`p-2 ${index % 2 === 0 ? '' : 'bg-gray-100'} m-auto`}>{moment(item.createdAt).format('DD/MM/YY')}</td>
                                <td className='flex gap-2 pt-2'>
                                    <span
                                        onClick={() => setIsEditImage(item)}
                                        className='p-2 text-main hover:underline cursor-pointer'
                                    >Biến thể</span>
                                    <span
                                        className='p-2 cursor-auto text-main hover:underline'
                                        onClick={() => handleUpdate(item)}
                                    >Sửa</span>
                                    <span
                                        onClick={() => handleDeleteProduct(item.id)}
                                        className='p-2 text-main hover:underline cursor-pointer'
                                    >Xóa</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {products && products.count && <div className='flex items-center justify-center'>
                <button
                    type='button'
                    className='w-[335px] py-2 bg-white rounded-md shadow-md border flex gap-2 items-center justify-center'
                    onClick={() => setPage(prev => prev + 1)}
                >
                    <span>{`Xem thêm ${products?.count - +process.env.REACT_APP_LIMIT_PRODUCTS * page} sản phẩm`}</span>
                    <AiFillCaretDown />
                </button>
            </div>}
        </div >
    )
}

export default ManageProduct