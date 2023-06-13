import { useParams } from 'react-router-dom';
import Layout from "../layout/Layout";
import { useEffect, useState } from "react"; //QUITAR "USESTATE" CUANDO SE AÑADA EL BORRAR ANUNCIO REDUX
import { deleteAdvert } from "./service"; 
import { getAdvert } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { advertLoad } from '../../store/actions';
import placeholderImage from "../../assets/placeholder.jpg";
import './Advert.css'

const AdvertPage = () => {
  const dispatch = useDispatch();
  const { advertId } = useParams();
  const [error, setError] = useState(null); //QUITAR CUANDO SE AÑADA EL BORRAR ANUNCIO REDUX
  // const advert = useSelector(state => getAdvert(state, advertId));
  const advert = useSelector(getAdvert(advertId));
  const advertSale = advert && advert.sale ? "En venta" : "Se busca";
  const [showAlert, setShowAlert] = useState(false);


  const handleDeleteClick = () => {
    setShowAlert(true);
  };

  const handleAlertConfirm = () => {
    deleteAdvert(advert.id)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleAlertCancel = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    dispatch(advertLoad(advertId));
  }, [dispatch, advertId]);

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
                  onClick={handleDeleteClick}
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
                      onClick={handleAlertConfirm}
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
