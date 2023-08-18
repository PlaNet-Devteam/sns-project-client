import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_FEED_API;

export const baseInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFeeds = async ({ pageParam = 1 }) => {
  return await baseInstance
    .get('/feeds', {
      params: {
        page: pageParam,
        limit: 10,
      },
    })
    .then((res) => res?.data);
};

export const getServerFeeds = () => {
  return baseInstance.get('/feeds?page=1&limit=10');
};

export const getComments = () => {
  return baseInstance.get('/comment/1');
};
