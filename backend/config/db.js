import mongoose from 'mongoose'

/**
 * Method that connects our MongoDB database.
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/testdb", {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB
