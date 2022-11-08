import mongoose from 'mongoose'


const categorySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Category = mongoose.model('Category', categorySchema)

export default Category
