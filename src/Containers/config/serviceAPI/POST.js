import axios from 'axios';
import {rootAPI} from './root';

const POST = (path, data) => {
    const promise =  new Promise((resolve, reject) => {
        axios.post(`${rootAPI}/${path}`, data)
        .then((result => {
            resolve(result)
        }, (err) => {
            reject(err)
        }))
    })
    return promise;
}

export default POST;