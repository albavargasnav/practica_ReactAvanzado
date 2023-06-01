import { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import Button from '../shared/Button';
import './NewAdvertPage.css';
import { createAdvert, getTags } from './service';
import { useNavigate } from 'react-router-dom';

const MIN_CHARACTERS = 5;

const NewAdvertPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [sale, setSale] = useState(false);
  const [tags, setTags] = useState([]);
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [obtainTags, setObtainTags] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const tags = await getTags();
      console.log(tags);
      setObtainTags(tags);
    }
    fetchData();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSaleChange = (event) => {
    setSale(event.target.value === 'true');
  };

  const handleTagsChange = (event) => {
    const selectedTags = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setTags(selectedTags);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file || null);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('sale', sale);
      formData.append('tags', tags);
      formData.append('price', price);
      if (photo) {
        formData.append('photo', photo);
      }
      const advert = await createAdvert(formData);

      setIsLoading(false);
      navigate(`/adverts/${advert.id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      }
    }
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
            <div
              className='createAdvertContainer'
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
                onChange={handleTagsChange}
                required
              >
                {obtainTags.map((tag) => (
                  <option value={tag}>{tag}</option>
                ))}
              </select>
            </div>
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
