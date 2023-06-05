import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_FEED_API;

export const baseInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFeeds = () => {
  return baseInstance.get('/feeds');
};

export const getComments = () => {
  return baseInstance.get('/comment/1');
};
