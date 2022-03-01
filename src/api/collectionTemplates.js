import { callApi } from './';

export const createCollectionTemplate = async ({body, token}) => {
    const data = await callApi({
        method: 'POST',
        url: `collection-templates/`,
        body,
        token
    });
    return data;
};

export const editCollectionTemplate = async ({body, token, id}) => {
  const data = await callApi({
      method: 'PATCH',
      url: `collection-templates/${id}`,
      body,
      token
  });
  return data;
};

export const deleteCollectionTemplate = async (id, token) => {
  const data = await callApi({
      method: 'DELETE',
      url: `collection-templates/${id}`,
      token
  });
  return data;
};

export const getUsersCollectionTemplates = async (userId) => {
  const data = await callApi({
      url: `collection-templates/user/${userId}`
  });
  return data;
};

export const getMyCollectionTemplates = async (token) => {
  const data = await callApi({
      url: `collection-templates/user`,
      token
  });
  return data;
};

export const getMyCollectionTemplate = async (collectionTemplateId, token) => {
  const data = await callApi({
      url: `collection-templates/me/id/${collectionTemplateId}`,
      token
  });
  return data;
};

export const getAllCollectionTemplates = async () => {
  const data = await callApi({
      url: `collection-templates`
  });
  return data;
};

export const getCollectionTemplateById = async (collectionTemplateId) => {
  const data = await callApi({
      url: `collection-templates/id/${collectionTemplateId}`
  });
  return data;
};
