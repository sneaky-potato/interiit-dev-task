import { useState, useEffect } from 'react';
import MeiliSearch from 'meilisearch';
import { PropTypes } from 'prop-types';
import Modal from './modal';
import { MEILISEARCH_URL } from '../config';

function Navbar(props) {
  const {
    currentIndex, setCurrentIndex,
  } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [indices, setIndices] = useState([]);
  const [navMessage, setNavMessage] = useState('');
  const [isNavActive, setIsNavActive] = useState(false);

  const changeCurrentIndex = (event) => {
    setCurrentIndex(event.target.value);
  };

  const changeNavbarHandler = () => {
    setIsNavActive((current) => !current);
  };

  useEffect(() => {
    const masterKey = localStorage.getItem('apiKey');
    const client = new MeiliSearch({ host: MEILISEARCH_URL, apiKey: masterKey });

    client.getIndexes()
      .then((response) => {
        setIndices(response.results);
        if (response.results[0].uid !== undefined) {
          setCurrentIndex(response.results[0].uid);
          setNavMessage('');
        } else {
          setNavMessage('No data index found');
        }
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
        <button type="button" onClick={changeNavbarHandler} className="nav-title">Securch</button>
        <ul className={isNavActive ? 'active' : 'inactive'}>
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
                  <option key={index} value={index.uid}>{index.uid}</option>
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
