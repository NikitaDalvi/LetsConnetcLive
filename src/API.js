/*jshint esversion: 9*/
export const API = {
  URL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL,
  BASE_URL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BASE_URL : process.env.REACT_APP_DEV_BASE_URL
};

