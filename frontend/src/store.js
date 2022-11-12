import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Reducers
import {categoryListReducer, } from './trigger/categoryReducers'
import {productListReducer, productDetailsReducer, } from './trigger/productReducers'
import {cartReducer } from './trigger/cartReducers'
import {userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, } from './trigger/userReducers'
import {createOrderReducer, orderDetailsReducer, orderListUserReducer, orderPayReducer, } from './trigger/orderReducers'

const reducer = combineReducers({
    categoryList: categoryListReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    createOrder: createOrderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListUser: orderListUserReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}

// Load initial state when the application is loaded
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
