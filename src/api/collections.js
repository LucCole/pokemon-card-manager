import { callApi } from './';

export const createCollection = async ({body, token}) => {
    const data = await callApi({
        method: 'POST',
        url: `collections/`,
        body,
        token
    });
    return data;
};

export const getUsersCollections = async (token) => {
  const data = await callApi({
      url: `collections/user`,
      token
  });
  return data;
};

export const getUsersCollection = async (userId) => {
  const data = await callApi({
      url: `collections/user/${userId}`
  });
  return data;
};

export const getCollectionById = async (collectionId, token) => {
  const data = await callApi({
      url: `collections/id/${collectionId}`,
      token
  });
  return data;
};
