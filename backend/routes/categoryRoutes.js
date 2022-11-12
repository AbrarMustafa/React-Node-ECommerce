import express from 'express'
import {
    getCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/').get(getCategories)

router.route('/:id').get(getCategoryById)

router.route('/add').post(protect,addCategory)

router.route('/update/:id').put(protect,updateCategory)

router.route('/delete/:id').delete(protect,deleteCategory)

export default router
