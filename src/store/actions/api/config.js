import axios from 'axios';
import { DB_URL } from '../../../constants';

export default axios.create({
  baseURL: DB_URL,
  withCredentials: true,
  maxContentLength: 500000000
});