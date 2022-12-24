import { useState, useEffect } from 'react';
import MeiliSearch from 'meilisearch';
import { PropTypes } from 'prop-types';
import Modal from './modal';

function Navbar(props) {
  const {
    currentIndex, setCurrentIndex,
  } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [indices, setIndices] = useState([]);
  const [navMessage, setNavMessage] = useState('');

  const changeCurrentIndex = (event) => {
    setCurrentIndex(event.target.value);
  };

  useEffect(() => {
    const masterKey = localStorage.getItem('apiKey');
    const client = new MeiliSearch({ host: 'http://localhost:7700', apiKey: masterKey });

    client.getIndexes()
      .then((response) => {
        setIndices(response.results);
        setCurrentIndex(response.results[0].uid);
        setNavMessage('');
      })
      .catch((error) => {
        if (masterKey !== null) {
          setNavMessage('Please enter correct API Key');
        } else {
          setNavMessage('Error connecting server');
        }
        setCurrentIndex('Server error');
        setIndices([{ uid: 'Server error' }]);
        console.log(error);
      });
  }, [modalOpen]);

  return (
    <div className="navbar">
      <div className="nav-links">
        <div className="nav-title">Search</div>
        <ul>
          <li>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="/admin"
            >
              admin
            </a>
          </li>
          <li>
            <select value={currentIndex} onChange={changeCurrentIndex}>
              {
                indices.map((index) => (
                  <option value={index.uid}>{index.uid}</option>
                ))
              }
            </select>

          </li>
          <li>
            <button
              type="button"
              className="openModalBtn"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              API Key
            </button>
          </li>
          <li>
            {modalOpen && <Modal setOpenModal={setModalOpen} />}
          </li>
          <li className={navMessage !== '' ? 'server-message' : 'li'}>
            {navMessage}
          </li>
        </ul>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  currentIndex: PropTypes.string.isRequired,
  setCurrentIndex: PropTypes.func.isRequired,
};

export default Navbar;
