import axios from 'axios';
import {rootAPI} from './root';

const PUT = (path, data) => {
    const promise = new Promise((resolve, reject) => {
        axios.put(`${rootAPI}/${path}`, data)
        .then((result) => {
            resolve(result)
        }, (err) => {
            reject(err)
        })
    })
    return promise;
}

export default PUT;