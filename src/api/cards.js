import { callApi } from './';

export const getAllCards = async (token) => {
  const data = await callApi({
      url: `cards`,
      token
  });
  return data;
};
