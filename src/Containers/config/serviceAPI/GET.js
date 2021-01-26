import axios from 'axios';
import {rootAPI} from './root';

const GET = (path) => {
    const promise = new Promise((resolve, reject) => {
        axios.get(`${rootAPI}/${path}`)
        .then((result) => {
            resolve(result.data)
        }, (err) => {
            reject(err)
        })
    })
    return promise;
}

export default GET;