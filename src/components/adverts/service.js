import client from '../../api/client';

const advertsUrl = '/api/v1/adverts';

export const getLatestAdverts = () => {
  const url = advertsUrl;
  return client.get(url);
};

export const getAdvert = advertId => {
  const url = `${advertsUrl}/${advertId}`
  return client.get(url)
};

export const createAdvert = advert => {
  const url = advertsUrl;
  return client.post(url, advert, {});
};

export const deleteAdvert = advertId => {
  const url = `${advertsUrl}/${advertId}`;
  return client.delete(url);
};

export const getTags = () => {
  const url = `${advertsUrl}/tags`;
  return client.get(url);
};
