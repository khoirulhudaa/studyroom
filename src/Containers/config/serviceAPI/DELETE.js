import axios from 'axios';
import  {rootAPI} from './root';

const DELETE = (path) => {
    const promise = new Promise((resolve, reject) => {
        axios.delete(`${rootAPI}/${path}`)
        .then((result) => {
            resolve(result)
        }, (err) => {
            reject(err)
        })
    })
    return promise;
}


export default DELETE;