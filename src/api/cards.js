import { callApi } from './';

export const getAllCards = async (token) => {
  const data = await callApi({
      url: `cards`,
      token
  });
  return data;
};

export const getCard = async (id) => {
  const data = await callApi({
      url: `cards/id/${id}`
  });
  return data;
};

export const createCard = async ({body, token}) => {
    const data = await callApi({
        method: 'POST',
        url: `cards/`,
        body,
        token
    });
    return data;
};

export const editCard = async ({body, token, id}) => {
  const data = await callApi({
      method: 'PATCH',
      url: `cards/${id}`,
      body,
      token
  });
  return data;
};

