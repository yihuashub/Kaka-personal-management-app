import axios from 'axios';
import {rootUrl} from "../config";

const ITEM_CON_URL = rootUrl + "item_containers";

class itemContainerService {

    getContainers() {
        return axios.get(ITEM_CON_URL);
    }

    createContainer(container) {
        return axios.post(ITEM_CON_URL, container);
    }

    getContainerById(containerId) {
        return axios.get(ITEM_CON_URL + '/' + containerId);
    }

    updateContainer(container, containerId) {
        return axios.put(ITEM_CON_URL + '/' + containerId, container);
    }

    deleteContainer(containerId) {
        return axios.delete(ITEM_CON_URL + '/' + containerId);
    }
}

export default new itemContainerService()
