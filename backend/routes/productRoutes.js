import express from 'express'
import {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
} from '../controllers/productController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/').get(getProducts)

router.route('/:id').get(getProductById)

router.route('/add').post(protect,addProduct)

router.route('/update/:id').post(protect,updateProduct)

export default router
