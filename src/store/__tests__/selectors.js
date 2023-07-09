import { getAdvert } from '../selectors';

describe('getAdvert', () => {
    test('should return an advert by advertId', () => {
        const advertId = 1;
        const adverts = [{ id: 1, title: 'Advert 1' }, { id: 2, title: 'Advert 2' }];
        const state = { adverts: { data: adverts } };
      
        expect(getAdvert(advertId)(state)).toEqual(adverts[0]);
    });

  test('should not return any advert', () => {
    const advertId = '1';
    const adverts = [];
    const state = { adverts: { data: adverts } };

    expect(getAdvert(advertId)(state)).toBeUndefined();
  });
});