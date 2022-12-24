import { useState, useEffect } from 'react';
import MeiliSearch from 'meilisearch';
import { PropTypes } from 'prop-types';
import SearchCard from './searchCard';

function Searchbar(props) {
  const { currentIndex } = props;

  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([{ id: -1, title: 'Trying to reach server', url: 'https://http.cat/204' }]);

  useEffect(() => {
    const masterKey = localStorage.getItem('apiKey');
    const client = new MeiliSearch({ host: 'http://localhost:7700', apiKey: masterKey });

    client.index(currentIndex).search(query)
      .then((res) => {
        setHits(res.hits);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query]);

  return (
    <div className="searchbar">
      <div className="searchbar-card">

        <div className="searchbar-text">
          Type in something
        </div>
        <div className="searchbar-util">
          <input type="text" placeholder="query" value={query} onChange={(e) => setQuery(e.target.value)} className="searchbar-input" />
        </div>
      </div>
      <div className="results">
        {
          hits.map((hit) => (
            <SearchCard
              id={hit.id}
              title={hit.title}
              url={hit.url}
            />
          ))
        }
      </div>
    </div>
  );
}

Searchbar.propTypes = {
  currentIndex: PropTypes.string.isRequired,
};

export default Searchbar;
