import { callApi } from './';

export const getSetById = async (setId) => {
  const data = await callApi({
      url: `sets/id/${setId}`
  });
  return data;
};

export const getAllSets = async (setId) => {
  const data = await callApi({
      url: `sets`
  });
  return data;
};

export const getAllSetsSnippet = async (setId) => {
  const data = await callApi({
      url: `sets/id/${setId}`
  });
  return data;
};
