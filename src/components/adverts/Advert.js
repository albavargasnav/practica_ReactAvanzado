import React from 'react';
import Photo from '../shared/Photo';
import './Advert.css';

const Advert = ({ advert }) => {
  const advertSale = advert.sale ? 'Sell' : 'Buy';
  return (
    <article className="advert bordered">
      <div className="left">
        <Photo className="advert-photo" />
      </div>
      <div className="right">
        <div className="advert-header">
          <div className="advert-name">{advert.name}</div>
          <div className="advert-username">
            <b>Sale:</b> {advertSale}
          </div>
          <div className="advert-username">
            <b>Price:</b> {advert.price}€
          </div>
          <div className="advert-username">
            <b>Tags:</b> {advert.tags}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Advert;
