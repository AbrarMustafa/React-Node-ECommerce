import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
// Components
import Category from '../components/Category'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
// Redux
import { listProducts } from '../actions/productActions'
import { listCategories } from '../actions/categoryActions'

const Home = () => {
//----------------Product----------------//
const dispatch = useDispatch()
    // Grab the data from the state
    const productList = useSelector((state) => state.productList)
    const { loadingProduct, errorProduct, products } = productList

    // Whatever is put inside the useEffect function will run as soon as the component loads.
    useEffect(() => {
        // Dispatch the list products action and fill our state
        dispatch(listProducts())
    }, [dispatch])

//----------------Category----------------//
    // Grab the data from the state
    const categoryList = useSelector((state) => state.categoryList)
    const { loadingCategory, errorCategory, categories } = categoryList

    // Whatever is put inside the useEffect function will run as soon as the component loads.
    useEffect(() => {
        // Dispatch the list Categories action and fill our state
        dispatch(listCategories())
    }, [dispatch])

//----------------View----------------//
return (
        <>
            {/* Categories */}
            <h1>Latest categories</h1>
            {loadingCategory ? (
                <Loader />
            ) : errorCategory ? (
                <Message variant='danger'>{errorCategory}</Message>
            ) : (
                <Row>
                    {categories.map((category) => (
                        <Col key={category._id} sm={12} md={6} lg={4} xl={3}>
                            <Category category={category} />
                        </Col>
                    ))}
                </Row>
            )}

            {/* Products */}
            <h1>Latest products</h1>
            {loadingProduct ? (
                <Loader />
            ) : errorProduct ? (
                <Message variant='danger'>{errorProduct}</Message>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default Home
