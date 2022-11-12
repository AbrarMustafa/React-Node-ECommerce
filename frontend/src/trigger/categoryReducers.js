import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
} from '../constants/categoryConstants'

// Getting categories from server
export const categoryListReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return {
                loadingCategory: true,
                categories: [],
            }
        case CATEGORY_LIST_SUCCESS:
            return {
                loadingCategory: false,
                categories: action.payload,
            }
        case CATEGORY_LIST_FAIL:
            return {
                loadingCategory: false,
                errorCategory: action.payload,
            }
        default:
            return state
    }
}
