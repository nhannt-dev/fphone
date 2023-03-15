import db from '../models'
require('dotenv').config()
import { Op } from 'sequelize'
import { v4 as genId } from 'uuid'
import { sequelize } from '../config/connect-database'
import uniqid from 'uniqid';

export const getProducts = ({ page, limit, order, catalog, star, q, price, ...query }) => new Promise(async (resolve, reject) => {
    try {
        const queries = { nest: true }
        const offsetStep = !page ? 1 : +page > 1 ? +page : 1
        queries.limit = +process.env.LIMIT_PRODUCTS * +offsetStep
        if (order) queries.order = [order]
        if (q) {
            query = {
                [Op.or]: [
                    { name: { [Op.substring]: q.trim() } },
                    { catalog: { [Op.substring]: q } },
                    { detail: { [Op.substring]: q } },
                    { overviews: { [Op.substring]: q } },
                    { desc: { [Op.substring]: q } },
                ]
            }
        }
        if (catalog) query.catalogslug = { [Op.substring]: catalog }
        if (price && price !== 'up' && price !== 'down') queries.include = [{ model: db.Varriant, as: 'variants', where: { price: { [Op.between]: price } } }]
        else queries.include = [{ model: db.Varriant, as: 'variants', where: { price: { [Op.gt]: 1000 } } }]
        const data = {
            where: query,
            ...queries
        }
        if (price === 'up')
            // Order theo include
            data.order = [[{ model: db.Varriant, as: 'variants' }, 'price', 'ASC']]
        if (price === 'down')
            data.order = [[{ model: db.Varriant, as: 'variants' }, 'price', 'DESC']]
        const response = await db.Product.findAndCountAll(data)
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Got' : 'Something went wrong!',
            productDatas: response
        })

    } catch (error) {
        reject(error)
    }
})
export const getProductsAdmin = ({ page, limit, order, name, catalog, ...query }) => new Promise(async (resolve, reject) => {
    try {
        const queries = { nest: true }
        const offsetStep = !page ? 1 : +page > 1 ? +page : 1
        // const limitProducts = limit ? +limit : +process.env.LIMIT_PRODUCTS
        // queries.offset = offsetStep * limitProducts
        queries.limit = +process.env.LIMIT_PRODUCTS * +offsetStep
        if (order) {
            queries.order = [order]
        }
        if (catalog) query.catalog = { [Op.substring]: catalog }
        if (name) query.name = { [Op.substring]: name }
        const data = {
            where: query,
            ...queries,
            include: [
                { model: db.Varriant, as: 'variants' },
                { model: db.Vote, as: 'votes' },
                { model: db.Bipro, as: 'boughtProducts', include: [{ model: db.Bill, as: 'billdata' }] },
            ],
            attributes: {
                exclude: ['images']
            },
            order: [['updatedAt', 'DESC']]
        }
        const response = await db.Product.findAndCountAll(data)
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Got' : 'Something went wrong!',
            productDatas: response
        })

    } catch (error) {
        reject(error)
    }
})
export const getProductById = (pid) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Product.findOne({
            where: { id: pid },
            include: [
                { model: db.Varriant, as: 'variants' },
                {
                    model: db.Comment,
                    as: 'comments',
                    include: [{ model: db.User, as: 'commentator', attributes: ['name', 'id'] }],
                },
                { model: db.Vote, as: 'votes', include: [{ model: db.User, as: 'userData', attributes: ['name', 'id'] }] },
            ],
            order: [[{ model: db.Comment, as: 'comments' }, 'createdAt', 'ASC']],
            attributes: { exclude: ['uid'] }
        })
        await response.increment('views', { by: 1 })
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Got' : 'Something went wrong!',
            productDatas: response
        })
    } catch (error) {
        reject(error)
    }
})
export const ratings = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Vote.create(payload)
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Ratings is successfully' : 'Something went wrong!',
        })
    } catch (error) {
        reject(error)
    }
})
export const getWishlists = (pids) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Product.findAll({
            where: { id: pids },
            attributes: ['name', 'policy', 'star', 'thumb', 'id', 'discount'],
            include: [
                { model: db.Varriant, as: 'variants' },
                { model: db.Vote, as: 'votes' }
            ]
        })
        resolve({
            err: response ? 0 : 1,
            rs: response ? response : 'Something went wrong!',
        })
    } catch (error) {
        reject(error)
    }
})
export const getCarts = (pids) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Product.findAll({
            where: { id: pids },
            attributes: ['name', 'policy', 'star', 'thumb', 'id', 'discount'],
            include: [
                { model: db.Varriant, as: 'variants' },
                { model: db.Vote, as: 'votes' }
            ]
        })
        resolve({
            err: response ? 0 : 1,
            rs: response ? response : 'Something went wrong!',
        })
    } catch (error) {
        reject(error)
    }
})
export const buyProducts = (data) => new Promise(async (resolve, reject) => {
    try {
        const bid = genId()
        const bulkData = data.products.map(i => ({ ...i, bid }))
        const response = await Promise.all([
            db.Bill.create({ total: data.total, uid: data.uid, status: 'Pending', id: bid, coupon: data.coupon + '' }),
            db.Bipro.bulkCreate(bulkData)
        ])
        data?.products?.forEach(async (el) => {
            const rs = await db.Product.findByPk(el.pid)
            if (rs) rs.decrement('quantity', { by: +el.quantity })
        })
        resolve({
            err: response ? 0 : 1,
            rs: response ? response : 'Something went wrong!',
        })
    } catch (error) {
        reject(error)
    }
})
export const updateProduct = (pid, payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Product.update(payload, { where: { id: pid } })
        resolve({
            err: response[0] ? 0 : 1,
            rs: response[0] ? 'Updated' : 'Something went wrong!',
        })
    } catch (error) {
        reject(error)
    }
})
export const createProduct = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Product.create({ ...payload, id: genId() })
        resolve({
            err: response ? 0 : 1,
            rs: response ? 'Created' : 'Something went wrong!',
        })
    } catch (error) {
        reject(error)
    }
})
export const getDashboard = ({ days, type }) => new Promise(async (resolve, reject) => {
    try {
        const daysQuery = days || 220
        const typeDate = type === 'month' ? '%m-%y' : '%d-%m-%y'
        const [soldChart, customer] = await Promise.all([
            db.Bipro.findAll({
                where: { createdAt: { [Op.and]: [{ [Op.lte]: Date.now() }, { [Op.gte]: Date.now() - daysQuery * 24 * 60 * 60 * 1000 }] } },
                attributes: [
                    [sequelize.fn('date_format', sequelize.col('createdAt'), typeDate), 'shoppingDate'],
                    [sequelize.fn('SUM', sequelize.col('quantity')), 'soldProducts']
                ],
                group: 'shoppingDate',
                order: [['createdAt', 'ASC']]
            }),
            db.Bill.findAll({
                include: [
                    { model: db.User, attributes: ['name'], as: 'customer' }
                ],
                attributes: { exclude: ['uid', 'updatedAt'] }
            })
        ])
        const [visited, statusChart, rs] = await Promise.all([
            db.Visited.findAll({ attributes: [[sequelize.fn('sum', sequelize.col('times')), 'visited']], raw: true }),
            db.Bill.findAll({
                // Tính tổng và gộp nhóm theo trường
                attributes: [
                    'status',
                    [sequelize.fn('count', sequelize.col('status')), 'statusBill'],
                ],
                group: 'status'
            }),
            db.Bipro.findAll({
                // Format dữ liệu trả về theo tổng
                attributes: [
                    [sequelize.fn('sum', sequelize.col('quantity')), 'soldProducts'],
                    [sequelize.fn('sum', sequelize.col('price')), 'totals'],
                ],
                raw: true
            })
        ])
        resolve({
            err: visited ? 0 : 1,
            rs: { ...visited[0], ...rs[0], soldChart, statusChart, customer },

        })
    } catch (error) {
        reject(error)
    }
})
export const changeStatus = (status, id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Bill.update({ status }, { where: { id } })
        resolve({
            err: response ? 0 : 1,
            rs: response ? 'updated' : 'Something went wrong!',
        })
    } catch (error) {
        reject(error)
    }
})
export const getBills = ({ limit, page, order, name }) => new Promise(async (resolve, reject) => {
    try {
        const offset = !page || +page <= 1 ? 0 : +page
        const lt = +limit || 20
        const queries = {}
        if (order) queries.order = [order]
        const query = {}
        // Filter trong include
        if (name) query['$customer.name$'] = { [Op.substring]: name }
        const response = await db.Bill.findAndCountAll({
            where: query,
            limit: lt,
            offset: lt * offset,
            ...queries,
            attributes: { exclude: ['uid', 'updatedAt'] },
            include: [
                { model: db.User, attributes: ['name'], as: 'customer' },
                { model: db.Coupon, as: 'selectedCoupon' },
                {
                    model: db.Bipro,
                    as: 'billDetails',
                    // Include lồng include
                    include: [
                        { model: db.Product, as: 'products', attributes: ['name', 'thumb', 'discount', 'id'] }
                    ]
                },
                { model: db.Coupon, as: 'selectedCoupon' }
            ]
        })
        resolve({
            err: response ? 0 : 1,
            rs: response ? response : 'Something went wrong!',
        })
    } catch (error) {
        reject(error)
    }
})
export const deleteProduct = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Product.destroy({ where: { id } })
        resolve({
            err: response ? 0 : 1,
            rs: response ? 'Deleted' : 'Something went wrong!',
        })
    } catch (error) {
        reject(error)
    }
})
export const updateVariants = (id, { thumb, name, images, price }) => new Promise(async (resolve, reject) => {
    try {
        const response = await Promise.all([
            db.Product.update({ thumb: thumb[0].path }, { where: { id } }),
            db.Varriant.create({
                name,
                sku: uniqid(),
                price,
                images: [images.map(el => el.path), images.map(el => el.path)],
                pid: id
            })
        ])
        resolve({
            err: response ? 0 : 1,
            rs: response ? response : 'Something went wrong!',
        })
    } catch (error) {
        reject(error)
    }
})