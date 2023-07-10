import { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import Button from '../shared/Button';
import './NewAdvertPage.css';
//import { getTags } from './service'; //añadir gettags en advertcreate un poco mas abajo (en actions)
import { useDispatch, useSelector } from 'react-redux';
import { advertCreate, tagsRequest, tagsSuccess, tagsFailure } from '../../store/actions';
import { getUi } from '../../store/selectors';


const MIN_CHARACTERS = 5;

const NewAdvertPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getUi);
  const [name, setName] = useState('');
  const [sale, setSale] = useState(false);
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [obtainTags, setObtainTags] = useState([]);
  const tags = useSelector(state => state.ui.tags); // Obtengo los tags del estado de Redux
  const tagsLoading = useSelector(state => state.ui.tagsLoading); // Obtengo el estado de carga de los tags
  const tagsError = useSelector(state => state.ui.tagsError); // Obtengo el error relacionado con los tags
  const [selectedTags, setSelectedTags] = useState([]);


useEffect(() => {
  dispatch(tagsRequest()); // Inicio la solicitud de obtención de los tags

  // Simulo la obtención exitosa de los tags hardcodeados
  const hardCodedTags = ['Mobile', 'Motor', 'LifeStyle'];
  setTimeout(() => {
    dispatch(tagsSuccess(hardCodedTags)); // Establezco los tags hardcodeados como éxito
  }, 2000);
}, [dispatch]);

  useEffect(() => {
    // async function fetchData() {
    //   const tags = await getTags();
    //   console.log(tags);
    //   setObtainTags(tags);
    // }
    // fetchData();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSaleChange = (event) => {
    setSale(event.target.value === 'true');
  };


  useEffect(() => {
    const hardCodedTags = ['Mobile', 'Motor', 'LifeStyle']; 
    setObtainTags(hardCodedTags);
  }, []);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file || null);
  };


  const handleSubmit = event => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('sale', sale);
    formData.append('tags', selectedTags.join(','));
    formData.append('price', price);
    if (photo) {
      formData.append('photo', photo);
    }
  
    dispatch(advertCreate(formData));
  };

  const isDisabled = isLoading || name.length < MIN_CHARACTERS;

  return (
    <Layout title="Crea tu anuncio">
      <div className="newAdvertPage bordered">
        <div className="right">
          <form onSubmit={handleSubmit}>
            <label>
              <b>Name:</b>
              <input
                style={{
                  borderWidth: 1,
                  marginBottom: '20px',
                  marginLeft: '10px',
                  marginTop: '20px',
                }}
                type="text"
                value={name}
                onChange={handleNameChange}
                required
              />
            </label>

            <br />
            <label>
              <b>Buy / Sell </b>
              <select
                style={{
                  borderWidth: 1,
                  marginBottom: '20px',
                  marginLeft: '10px',
                }}
                value={sale.toString()}
                onChange={handleSaleChange}
                required
              >
                <option value="true">Buy</option>
                <option value="false">Sell</option>
              </select>
            </label>
            <br />
            {tagsLoading ? (
  <div>Cargando tags...</div>
) : tagsError ? (
  <div>Error al obtener los tags</div>
) : (
  <div
    className="createAdvertContainer"
    style={{ display: 'flex', flexDirection: 'row' }}
  >
    <b>Tags: </b>
    <select
      style={{
        borderWidth: 1,
        marginLeft: '15px',
        marginTop: '6px',
        marginBottom: '20px',
      }}
      multiple
      value={tags}
      required
      onChange={(event) => setSelectedTags(Array.from(event.target.selectedOptions, (option) => option.value))}
    >
      {obtainTags.map((tag, index) => (
  <option key={index} value={tag}>{tag}</option>
))}
    </select>
  </div>
)}
            <label>
              <b>Price:</b>
              <input
                type="number"
                value={price}
                onChange={handlePriceChange}
                style={{
                  borderWidth: 1,
                  marginBottom: '20px',
                  marginLeft: '10px',
                }}
                required
                min="0"
              />
            </label>
            <br />
            <label>
              <b>Photo</b>
              <input
                type="file"
                name="photo"
                onChange={handlePhotoChange}
                style={{ marginLeft: '10px' }}
              />
            </label>
            <br />

            <div className="newAdvertPage-footer">
              <Button
                type="submit"
                className="newAdvertPage-submit"
                variant="primary"
                disabled={isDisabled}
              >
                Create Advert
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewAdvertPage;
