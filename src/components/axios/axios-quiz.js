import axios from 'axios';

export default axios.create({
    baseURL: 'https://economic-test-28c32-default-rtdb.firebaseio.com/'
})