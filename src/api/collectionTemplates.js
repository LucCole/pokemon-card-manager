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









// export const createOrder = async ({userId, purchaseComplete, productId, quantity, token}) => {
//     const data = await callApi({
//         method: 'POST',
//         url: `orders/`,
//         body: {
//             userId, 
//             purchaseComplete, 
//             productId,
//             quantity
//         },
//         token
//     });
//     return data;
// };

// export const updateOrderQuanity = async (orderId, quantity, token) => {
//     const data = await callApi({
//         method: 'PATCH',
//         url: `orders/${orderId}`,
//         body: { 
//             quantity
//         },
//         token
//     });
//     return data;
// };

// export const deleteOrder = async (orderId, token) => {
//     const data = await callApi({
//         method: 'DELETE',
//         url: `orders/${orderId}`,
//         token
//     });
//     return data;
// };

// export const getOrderById = async (orderId) => {
//     const data = await callApi({
//         url: `orders/${orderId}`
//     });
//     return data;
// };

// export const fetchAllOrdersByUserId = async (userId) => {
//     const data = await callApi({
//         url: `orders/user/${userId}`
//     });
//     return data;
// };

// export const getUsersCart = async (userId, token) => {
//     const data = await callApi({
//         url: `orders/cart/${userId}`,
//         token
//     });
//     return data;
// };

// export const deleteUsersCart = async (userId, token) => {
//     const data = await callApi({
//         method: 'DELETE',
//         url: `orders/cart/${userId}`,
//         token
//     });
//     return data;
// };


// export const submitCheckout = async (body, token) => {
//     const data = await callApi({
//         url: `checkouts/`,
//         method: 'POST',
//         body,
//         token
//     });
//     return data;
// }

// export const submitGuestCheckout = async (body) => {
//     const data = await callApi({
//         url: `checkouts/guest/`,
//         method: 'POST',
//         body
//     });
//     return data;
// }
