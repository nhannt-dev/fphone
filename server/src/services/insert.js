import db from '../models'
import brandData from '../../data/brand.json'
import productData from '../../data/product.json'
import productData_1 from '../../data/product1.json'
import productData_2 from '../../data/product2.json'
import { v4 as genId } from 'uuid'
import { makeid } from '../ultils/fn'
import userData, { coupons } from '../ultils/userData'
import { formatVietnameseToString } from '../ultils/fn'

const catalogNames = [
    'Đồng hồ',
    'Điện thoại',
    'Laptop',
    'Máy tính bảng',
    'Âm thanh',
    'Nhà thông minh',
    'Phụ kiện',
    'PC - Màn hình',
    'Tivi',
    'Thu cũ',
    'Hàng cũ',
    'Khuyến mãi'
]
const fullData = [productData, productData_1, productData_2]

export const insertBrand = () => new Promise(async (resolve, reject) => {
    try {
        brandData.forEach(async (item) => {
            await db.Brand.create({
                name: item?.name,
                desc: item?.desc,
                country: item?.country,
                head_quarters: item?.headQuarters,
                founded: item?.founded,
                image: item?.image
            })
        })
        resolve('Done')

    } catch (error) {
        reject(error)
    }
})

export const insertProduct = () => new Promise(async (resolve, reject) => {
    try {
        const catalogs = []
        const uids = userData.map(el => ''+el.id)
        await db.User.bulkCreate({
            id: userData.id,
            name: userData.name,
        password: userData.password,
        email: userData.email,
        role: userData.role
        })
        await db.Coupon.bulkCreate(coupons)
        fullData.forEach(f => {
            f.forEach(async (item) => {
                if (!catalogs.some(i => i.link === item?.link)) catalogs.push({ link: item?.link, name: item?.productCatalog })

                const pid = genId()+''
                const score = Math.round(Math.random() * 5)
                const discount = Math.round(Math.random() * 30)

                await db.Product.create({
                    id: pid,
                    name: item?.productName,
                    thumb: item?.thumb,
                    brand: item?.brandName,
                    policy: item?.productPolicies,
                    detail: item?.detailSpecs,
                    images: item?.hightLightImgs,
                    catalog: item?.productCatalog,
                    catalogslug: formatVietnameseToString(item?.productCatalog),
                    overviews: item?.overviewSpecs,
                    spec_thumb: item?.specThumb,
                    discount,
                    desc: item?.productDesc,
                    star: score,
                    quantity: Math.round(Math.random() * 1000)
                })
                await db.Vote.create({
                    pid,
                    uid: uids[Math.round(Math.random() * 4)],
                    score,
                    comment: makeid(Math.round(Math.random() * 30))+''
                })

                item?.variants?.forEach(async (i) => {
                    await db.Varriant.create({
                        pid,
                        sku: i?.sku,
                        name: i?.variantName,
                        price: i?.price !== '0' ? +i?.price * (1 - discount / 100) : (Math.round(Math.random() * 10000) + 1000) * 1000,
                        images: i?.images
                    })
                })

            })
        })
        catalogs.forEach(async (item) => {
            await db.Catalog.create({
                link: item?.link === 'dtdd' ? 'đien-thoai' : item?.link === 'dong-ho-thong-minh' ? 'đong-ho-thong-minh' : item?.link,
                value: catalogNames.find(i => item?.name?.includes(i))
            })
        })
        resolve('Done')

    } catch (error) {
        console.log(error)
        reject(error)
    }
})