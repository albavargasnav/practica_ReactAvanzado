import { useParams } from 'react-router-dom';
import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import { getAdvert } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { advertLoad, advertDeleted } from '../../store/actions';
import placeholderImage from "../../assets/placeholder.jpg";
import './Advert.css'

const AdvertPage = () => {
  const dispatch = useDispatch();
  const { Id } = useParams();
  const [error, setError] = useState(null); 
  const advert = useSelector(getAdvert(Id));
  const advertSale = advert && advert.sale ? "En venta" : "Se busca";
  const [showAlert, setShowAlert] = useState(false);

  const handleDeletedClick = () => {
    setShowAlert(true);
  };

  const handleAlertCancel = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    dispatch(advertLoad(Id));
  }, [dispatch, Id]);

  
  const handleDeleted = async event => {
    dispatch(advertDeleted(advert.id));
  };

  return (
    <Layout title="Advert Page">
      {advert && advert.id && (
        <div>
          <div className="advert-header">
            <div className="advertPage-container">
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

              {!showAlert && (
                <button
                  className="advert-delete-button"
                  onClick={handleDeletedClick}
                >
                  Borrar anuncio
                </button>
              )}

              {showAlert && (
                <div className="advert-delete-alert">
                  <div className="advert-delete-alert-message">
                    ¿Estás seguro de que quieres eliminar el anuncio?
                  </div>
                  <div className="advert-delete-alert-buttons">
                    <button
                      className="advert-delete-alert-confirm"
                      onClick={handleDeleted}
                    >
                      Aceptar
                    </button>
                    <button
                      className="advert-delete-alert-cancel"
                      onClick={handleAlertCancel}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              <div className="advertPagePhoto">
                {advert.photo ? (
                  <img src={advert.photo} alt={advert.name} />
                ) : (
                  <img src={placeholderImage} alt="Foto Placeholder" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdvertPage;
