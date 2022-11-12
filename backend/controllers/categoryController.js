import User from '../models/userModel.js'
import Category from '../models/categoryModel.js'
import asyncHandler from 'express-async-handler' // Middleware to handle exceptions inside async express routes
 
// @desc Fetch all categories
// @route GET /api/categories
// @access Public
const getCategories = asyncHandler(async (req, res) => {
    // Get all the categories from MongoDB
    const categories = await Category.find({})
    res.json(categories)
})

// @desc Fetch single categories
// @route GET /api/category/:id
// @access Public
const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)
    if (category) {
        res.json(category)
    } else {
        res.status(404)
        throw new Error('Category Not Found, Make sure you enter correct categoryId')
    }
})

// @desc Add category
// @route POST /api/category
// @access AdminOnly
const addCategory = asyncHandler(async (req, res) => {
    const _user = await User.findById(req.user._id)
    if (_user && _user.isAdmin) {
        var req = new Category(req.body);
        req.user = _user;
        var return_res = await req.save();
        res.json({ msg: "Category Added Successfully", val: return_res })
    }
    else
        res.json({ msg: "Failed To Add Category, Make sure you enter correct categoryId", val: return_res })
})

// @desc Update category
// @route POST /api/category
// @access AdminOnly
const updateCategory = asyncHandler(async (req, res) => {
    const _user = await User.findById(req.user._id)
    var _category = await Category.findById(req.params.id)
    if (_user && _user.isAdmin && _category) {
        _category.name = req.body.name || _category.name
        _category.image = req.body.image || _category.image
        _category.description = req.body.description || _category.description
        _category.brand = req.body.brand || _category.brand
        _category.category = req.body.category || _category.category
        _category.price = req.body.price || _category.price
        _category.countInStock = req.body.countInStock || _category.countInStock
        _category.rating = req.body.rating || _category.rating
        _category.numReviews = req.body.numReviews || _category.numReviews
        var return_res = await _category.save();

        res.json({ msg: "Category Updated Successfully", val: return_res })
    }
    else
        res.json({ msg: "Failed To Update Category, Make sure you enter correct categoryId", val: return_res })
})

// @desc Delete category
// @route Delete /api/category
// @access AdminOnly
const deleteCategory = asyncHandler(async (req, res) => {
    const _user = await User.findById(req.user._id)
    const _category = await Category.findById(req.params.id)
    if (_user && _user.isAdmin && _category) {
        var return_res = await _category.delete();

        res.json({ msg: "Category Deleted Successfully", val: return_res })
    }
    else
        res.json({ msg: "Failed To Deleted Category, Make sure you enter correct ccategoryId", val: return_res })
})

export { getCategories, getCategoryById, addCategory, updateCategory, deleteCategory}
