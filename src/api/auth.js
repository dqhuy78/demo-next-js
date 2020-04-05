import axios from '~/utils/axios';

const getAuthUser = axios.get('/users');

const getPost = axios.get('/posts');

export default {
    getAuthUser,
    getPost,
};
