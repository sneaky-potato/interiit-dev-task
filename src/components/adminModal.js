import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react';
import MeiliSearch from 'meilisearch';

function AdminModal(props) {
  const {
    setOpenModal,
  } = props;
  const [masterKey, setMasterKey] = useState('');

  useEffect(() => {
    const apiKey = localStorage.getItem('masterKey');
    if (apiKey !== null) {
      setMasterKey(apiKey);
    }
    const client = new MeiliSearch({ host: 'http://localhost:7700', apiKey: masterKey });
    client.getKeys()
      .then((res) => {
        console.log(res);
        localStorage.setItem('masterKey', masterKey);
        setOpenModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [masterKey]);

  return (
    <div className="admin-modal">
      <div className="admin-modal-content">
        <div className="admin-modal-title">
          Please enter the master key to access admin control
        </div>
        <input type="text" placeholder="masterKey" value={masterKey} onChange={(e) => setMasterKey(e.target.value)} />
      </div>
    </div>
  );
}

AdminModal.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};

export default AdminModal;
