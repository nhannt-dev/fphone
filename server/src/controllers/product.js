import * as services from '../services'

export const getProducts = async (req, res) => {
    try {
        const response = await services.getProducts(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Lỗi server ' + error
        })
    }
}
export const getProductsAdmin = async (req, res) => {
    try {
        const response = await services.getProductsAdmin(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Lỗi server ' + error
        })
    }
}

export const getProductById = async (req, res) => {
    try {
        if (!req.query || !req.query.pid) {
            return res.status(400).json({
                err: 1,
                mes: 'Missing product ID'
            })
        }
        const response = await services.getProductById(req.query.pid)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Lỗi server ' + error
        })
    }
}
export const ratings = async (req, res) => {
    const { id } = req.user
    const { pid, score } = req.body
    try {
        if (!id || !pid || !score) {
            return res.status(400).json({
                err: 1,
                mes: 'Missing product ID'
            })
        }
        const response = await services.ratings({ ...req.body, uid: id })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Lỗi server ' + error
        })
    }
}
export const getWishlists = async (req, res) => {
    const { pids } = req.query
    try {
        if (!pids) {
            return res.status(400).json({
                err: 1,
                mes: 'Missing product ID'
            })
        }
        const response = await services.getWishlists(pids)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Lỗi server ' + error
        })
    }
}
export const getCarts = async (req, res) => {
    const { pids } = req.query
    try {
        if (!pids) {
            return res.status(400).json({
                err: 1,
                mes: 'Missing product ID'
            })
        }
        const response = await services.getCarts(pids)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Lỗi server ' + error
        })
    }
}
export const buyProducts = async (req, res) => {
    const { total, products, coupon } = req.body
    const { id } = req.user
    try {
        if (!products || !total) {
            return res.status(400).json({
                err: 1,
                mes: 'Missing product ID'
            })
        }
        const response = await services.buyProducts({ total, products, uid: id, coupon: coupon || 0 })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Lỗi server ' + error
        })
    }
}
export const updateProduct = async (req, res) => {
    const { pid } = req.params
    try {
        const response = await services.updateProduct(pid, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Lỗi server ' + error
        })
    }
}
export const createProduct = async (req, res) => {
    try {
        const response = await services.createProduct(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Lỗi server ' + error
        })
    }
}
export const getDashboard = async (req, res) => {
    try {
        const response = await services.getDashboard(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Lỗi server ' + error
        })
    }
}
export const changeStatus = async (req, res) => {
    try {
        const { status } = req.body
        const { pid } = req.params
        const response = await services.changeStatus(status, pid)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Lỗi server ' + error
        })
    }
}
export const getBills = async (req, res) => {
    try {
        const response = await services.getBills(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Lỗi server ' + error
        })
    }
}
export const deleteProduct = async (req, res) => {
    const { pid } = req.params
    try {
        const response = await services.deleteProduct(pid)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Lỗi server ' + error
        })
    }
}
export const updateVariants = async (req, res) => {
    try {
        const { pid } = req.params
        const { name, price } = req.body
        const { images, thumb } = req.files
        if (!name || !price || !thumb || !images) return res.status(400).json({
            err: 1,
            mes: 'Missing inputs'
        })
        const response = await services.updateVariants(pid, { name, price, images, thumb })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            mes: 'Lỗi server ' + error
        })
    }
}