import User from '../models/userModel.js'
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler' // Middleware to handle exceptions inside async express routes
 
// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    // Get all the products from MongoDB
    const products = await Product.find({})
    res.json(products)
})

// @desc Fetch single product
// @route GET /api/product/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product Not Found, Make sure you enter correct productId')
    }
})

// @desc Add product
// @route POST /api/product
// @access AdminOnly
const addProduct = asyncHandler(async (req, res) => {
    const _user = await User.findById(req.user._id)
    if (_user && _user.isAdmin) {
        var req = new Product(req.body);
        req.user = _user;
        var return_res = await req.save();
        res.json({ msg: "Product Added Successfully", val: return_res })
    }
    else
        res.json({ msg: "Failed To Add Product, Make sure you enter correct productId", val: return_res })
})

// @desc Update product
// @route POST /api/product
// @access AdminOnly
const updateProduct = asyncHandler(async (req, res) => {
    const _user = await User.findById(req.user._id)
    var _product = await Product.findById(req.params.id)
    if (_user && _user.isAdmin && _product) {
        _product.name = req.body.name || _product.name
        _product.image = req.body.image || _product.image
        _product.description = req.body.description || _product.description
        _product.brand = req.body.brand || _product.brand
        _product.category = req.body.category || _product.category
        _product.price = req.body.price || _product.price
        _product.countInStock = req.body.countInStock || _product.countInStock
        _product.rating = req.body.rating || _product.rating
        _product.numReviews = req.body.numReviews || _product.numReviews
        var return_res = await _product.save();

        res.json({ msg: "Product Updated Successfully", val: return_res })
    }
    else
        res.json({ msg: "Failed To Update Product, Make sure you enter correct productId", val: return_res })
})

// @desc Delete product
// @route Delete /api/product
// @access AdminOnly
const deleteProduct = asyncHandler(async (req, res) => {
    const _user = await User.findById(req.user._id)
    const _product = await Product.findById(req.params.id)
    if (_user && _user.isAdmin && _product) {
        var return_res = await _product.delete();

        res.json({ msg: "Product Deleted Successfully", val: return_res })
    }
    else
        res.json({ msg: "Failed To Deleted Product, Make sure you enter correct productId", val: return_res })
})

export { getProducts, getProductById, addProduct, updateProduct, deleteProduct}
