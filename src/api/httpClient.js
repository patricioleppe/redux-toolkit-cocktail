import Axios from 'axios';

const getAll = (url) => {
    return Axios.get(`${url}`);
}

const exportedObj = {
    getAll
};

export default exportedObj;