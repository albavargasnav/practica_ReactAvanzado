import { Navigate, useNavigate, useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import { getAdvert, deleteAdvert } from "./service";
import placeholderImage from "../../assets/placeholder.jpg";
import './Advert.css'

const AdvertPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [advert, setAdvert] = useState(null);
  const advertSale = advert && advert.sale ? "En venta" : "Se busca";
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getAdvert(params.Id)
      .then((advert) => setAdvert(advert))
      .catch((error) => {
        if (error.status === 404) {
          return navigate("/404");
        }
        setError(error);
      });
  }, [params.Id, navigate]);

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

  if (error?.status === 404) {
    return <Navigate to="/404" />;
  }

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
