/**
 * Script to import data (not part of actual application)
 */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'

// Users and product data
import users from './data/users.js'
import products from './data/products.js'
import categories from './data/categories.js'

// Mongoose models
import Product from './models/productModel.js'
import Category from './models/categoryModel.js'
import Order from './models/orderModel.js'
import User from './models/userModel.js'

// Mongoose connection
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany() // Delete every order
        await Product.deleteMany() // Delete every product
        await User.deleteMany() // Delete every user

        // -----------------------------------------users-------------------------------------------------//
        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0].id

        // ----------------------------------------categories--------------------------------------------------//
        const createdCategories = await Category.insertMany(categories)

        // ----------------------------------------products--------------------------------------------------//
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser, category: createdCategories[0].id}
        })
        await Product.insertMany(sampleProducts)


        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`Error: ${error.message}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany() // Delete every order
        await Product.deleteMany() // Delete every product
        await User.deleteMany() // Delete every user

        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`Error: ${error.message}`.red.inverse)
        process.exit(1)
    }
}

// If the script contains the -d flag then the data will be destroyed else it will be imported into MongoDB
if (process.argv[2] == '-d') {
    destroyData()
} else {
    importData()
}
