import get from './GET';
import post from './POST';
import put from './PUT';
import del from './DELETE';

const getAPI  = () => get(`posts?_sort=id&_order=desc`);
const postAPI = (data) => post(`posts`, data);
const putAPI  = (data, id) => put(`posts/${id}`, data);
const delAPI = (id) => del(`posts/${id}`);


const API = {
    getAPI,
    postAPI,
    putAPI,
    delAPI
}

export default API;