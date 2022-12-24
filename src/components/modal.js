import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';

function Modal(props) {
  const {
    setOpenModal,
  } = props;

  const [masterKey, setMasterKey] = useState('');

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey');
    if (apiKey !== null) {
      setMasterKey(apiKey);
    }
  }, []);

  return (
    <div className="modalContainer">
      <input type="password" placeholder="Enter your API Key" value={masterKey} onChange={(e) => setMasterKey(e.target.value)} className="apikey-input" />
      <button
        className="apikey-button"
        type="button"
        onClick={() => {
          localStorage.setItem('apiKey', masterKey);
          setOpenModal(false);
        }}
      >
        GO
      </button>
    </div>
  );
}

Modal.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};

export default Modal;
