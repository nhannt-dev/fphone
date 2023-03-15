import express from 'express'
import * as controllers from '../controllers'
import { verifyToken, isAdmin } from '../middlewares/auth'
import uploader from '../config/cloudinary.config'

const router = express.Router()

router.get('/', controllers.getProducts)
router.get('/getone', controllers.getProductById)
router.post('/ratings', verifyToken, controllers.ratings)
router.get('/wishlist', verifyToken, controllers.getWishlists)
router.get('/cart', verifyToken, controllers.getCarts)
router.post('/buy', verifyToken, controllers.buyProducts)
router.get('/admin', [verifyToken, isAdmin], controllers.getProductsAdmin)
router.post('/admin', [verifyToken, isAdmin], controllers.createProduct)
router.get('/admin/dashboard', [verifyToken, isAdmin], controllers.getDashboard)
router.get('/admin/bills', [verifyToken, isAdmin], controllers.getBills)
router.put('/admin/changestatus/:pid', [verifyToken, isAdmin], controllers.changeStatus)
router.put('/variants/:pid', [verifyToken, isAdmin], uploader.fields([
    { name: 'thumb', maxCount: 1 },
    { name: 'images', maxCount: 10 }
]), controllers.updateVariants)
router.put('/admin/:pid', [verifyToken, isAdmin], controllers.updateProduct)
router.delete('/admin/:pid', [verifyToken, isAdmin], controllers.deleteProduct)



export default router