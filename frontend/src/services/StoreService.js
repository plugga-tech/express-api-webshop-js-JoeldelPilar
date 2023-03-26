import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json'
  }

});

export default {
  createUser(userData) {
    return apiClient.post('/users/add', userData);
  },

  loginUser(userData) {
    return apiClient.post('/users/login', userData);
  },

  getProducts() {
    return apiClient.get('/products');
  },
  sendOrder(orderData) {
    return apiClient.post('/orders/add', orderData);
  }
}