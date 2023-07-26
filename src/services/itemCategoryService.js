import axios from 'axios';
import {rootUrl} from "../config/config";

const ITEM_CAT_URL = rootUrl + "item_categories";

class ItemCategoryService {

    getItemCategories() {
        return axios.get(ITEM_CAT_URL);
    }

    createCategory(item) {
        return axios.post(ITEM_CAT_URL, item);
    }

    getCategoryById(itemId) {
        return axios.get(ITEM_CAT_URL + '/' + itemId);
    }

    updateCategory(item, itemId) {
        return axios.put(ITEM_CAT_URL + '/' + itemId, item);
    }

    deleteCategory(itemId) {
        return axios.delete(ITEM_CAT_URL + '/' + itemId);
    }
}

export default new ItemCategoryService()
