import axios from 'axios';

import { baseUrl } from '../config/constants';


const mockApiService = axios.create({
    baseURL: baseUrl
});

export { mockApiService };
