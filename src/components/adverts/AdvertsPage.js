import { useEffect, useState } from 'react';
import { getLatestAdverts } from './service';
import Button from '../shared/Button';
import Layout from '../layout/Layout';
import Advert from './Advert';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { connect } from 'react-redux';
import { getAdverts } from '../../store/selectors';
import { advertsLoaded } from '../../store/actions';
import './Advert.css'

const EmptyList = () => (
  <div style={{ textAlign: 'center' }}>
    <p>There are no published adverts. Create your advert</p>
    <Button as={Link} variant="primary" to="/adverts/new">
      Create Advert
    </Button>
  </div>
);

const AdvertsPage = ({ adverts, onAdvertsLoaded }) => {
  const isMounted = useRef(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);;
  const [saleFilter, setSaleFilter] = useState(null);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const adverts = await getLatestAdverts();

      onAdvertsLoaded(adverts);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const filteredAdverts = adverts.filter(advert =>
    (advert.name ?? '').toUpperCase().startsWith(query.toUpperCase())
    && (saleFilter === null || advert.sale === saleFilter)
  );

  const handleSaleFilterChange = event => {
    const selectedSale = event.target.value === 'null' ? null : event.target.value === 'true';
    setSaleFilter(selectedSale);
  };

  return (
    <Layout title="Lista de anuncios">
      {isLoading ? (
        <div>Accede a tu usuario través del botón superior</div>
      ) : (
        <div>
          {!!adverts.length ? (
            <>
            <div className='containerFilters'>
                <label for="name">
                Search name:{' '}
                  <input
                    type="text"
                    style={{ borderWidth: 1 }}
                    value={query}
                  onChange={event => setQuery(event.target.value)}
                  />
                </label>
                <label>
                  Filter by sale:{' '}
                  <select value={saleFilter ?? 'null'} onChange={handleSaleFilterChange} style={{ borderWidth: 1 }}>
                    <option value="null">All</option>
                    <option value="true">Sell</option>
                    <option value="false">Buy</option>
                  </select>
                </label>
              </div>
              <ul>
              {filteredAdverts.map(advert => (
                  <li key={advert.id}>
                    <Link to={`/adverts/${advert.id}`}>
                      <Advert key={advert.id} advert={advert} />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <EmptyList />
          )}
        </div>
      )}
    </Layout>
  );
};

const mapStateToProps = state => ({
  adverts: getAdverts(state),
});

// const mapDispatchToProps = dispatch => ({
//   onAdvertsLoaded: adverts => dispatch(advertsLoaded(adverts)),
// });

const mapDispatchToProps = {
  onAdvertsLoaded: advertsLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertsPage);
