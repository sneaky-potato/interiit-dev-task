import { useState, useEffect } from 'react';
import MeiliSearch from 'meilisearch';
import { Notyf } from 'notyf';
import { useNavigate } from 'react-router-dom';
import AdminModal from '../components/adminModal';
import AdminDashboard from '../components/adminDashboard';
import Footer from '../components/footer';
import { MEILISEARCH_URL } from '../config';

function Stats() {
  const [stats, setStats] = useState({ databaseSize: 0, lastUpdate: 0 });
  const [version, setVersion] = useState({ commitSha: 'null', commitDate: 'null', pkgVersion: '0.0' });
  const [keys, setKeys] = useState(['null', 'null']);

  useEffect(() => {
    const masterKey = localStorage.getItem('masterKey');
    const client = new MeiliSearch({ host: MEILISEARCH_URL, apiKey: masterKey });

    client.getStats()
      .then((response) => {
        setStats(response);
      })
      .catch((error) => {
        console.log(error);
      });

    client.getVersion()
      .then((response) => {
        setVersion(response);
      })
      .catch((error) => {
        console.log(error);
      });

    client.getKeys()
      .then((response) => {
        setKeys(response.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="stats admin-body">
      <div className="admin-title">
        Stats
      </div>
      <div className="admin-row">
        <div className="admin-row-key">Database Size: </div>
        <div className="admin-row-value">{stats.databaseSize}</div>
      </div>
      <div className="admin-row">
        <div className="admin-row-key">Last Updated: </div>
        <div className="admin-row-value">{stats.lastUpdate}</div>
      </div>
      <div className="admin-row">
        <div className="admin-row-key">Last commit SHA: </div>
        <div className="admin-row-value">{version.commitSha}</div>
      </div>
      <div className="admin-row">
        <div className="admin-row-key">Last commit Date: </div>
        <div className="admin-row-value">{version.commitDate}</div>
      </div>
      <div className="admin-row">
        <div className="admin-row-key">Package Version: </div>
        <div className="admin-row-value">{version.pkgVersion}</div>
      </div>
      {
        keys.map((key, index) => (
          <div className="admin-row" key={index}>
            <div className="admin-row-key">
              {key.name}
              :
              {' '}
            </div>
            <div className="admin-row-value">{key.key}</div>
          </div>
        ))
      }
    </div>
  );
}

function Indexes() {
  const [currentIndex, setCurrentIndex] = useState('');
  const [indices, setIndices] = useState([]);
  const [indexStats, setIndexStats] = useState({
    numberOfDocuments: 0,
    fieldDistribution: { id: 0 },
  });

  const [addIndex, setAddIndex] = useState('');
  const [addDocument, setAddDocument] = useState('');

  const notyf = new Notyf();
  const navigate = useNavigate();

  const changeCurrentIndex = async (event) => {
    setCurrentIndex(event.target.value);
    const masterKey = localStorage.getItem('masterKey');
    const client = new MeiliSearch({ host: MEILISEARCH_URL, apiKey: masterKey });
    client.index(event.target.value).getStats()
      .then((res) => {
        // console.log('index stats =>', res);
        setIndexStats(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addIndexHandler = async () => {
    const masterKey = localStorage.getItem('masterKey');
    const client = new MeiliSearch({ host: MEILISEARCH_URL, apiKey: masterKey });
    client.createIndex(addIndex, { primaryKey: 'id' })
      .then((res) => {
        console.log(res);
        notyf.success('Added index');
        navigate('/admin');
      })
      .catch((err) => {
        console.log(err);
        notyf.error('Some error occurred');
      });
  };

  const deleteIndexHandler = async () => {
    const masterKey = localStorage.getItem('masterKey');
    const client = new MeiliSearch({ host: MEILISEARCH_URL, apiKey: masterKey });
    client.deleteIndex(currentIndex)
      .then((res) => {
        console.log(res);
        notyf.success('Deleted index');
        navigate('/admin');
      })
      .catch((err) => {
        console.log(err);
        notyf.error('Some error occurred');
      });
  };

  const addDocumentHandler = async () => {
    const masterKey = localStorage.getItem('masterKey');
    const client = new MeiliSearch({ host: MEILISEARCH_URL, apiKey: masterKey });
    client.index(currentIndex).addDocuments(JSON.parse(String(addDocument)))
      .then((res) => {
        console.log(res);
        notyf.success('Added document');
      })
      .catch((err) => {
        console.log(err);
        notyf.error('Some error occurred');
      });
  };

  useEffect(() => {
    const masterKey = localStorage.getItem('masterKey');
    const client = new MeiliSearch({ host: MEILISEARCH_URL, apiKey: masterKey });

    client.getIndexes()
      .then((response) => {
        setIndices(response.results);
        // setCurrentIndex(response.results[0].uid);

        client.index(response.results[0].uid).getStats()
          .then((res) => {
            // console.log('index stats =>', res);
            setIndexStats(res);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="stats admin-body">
      <div className="admin-title">
        Indexes
      </div>
      <select value={currentIndex} onChange={changeCurrentIndex}>
        {
          indices.map((index, ind) => (
            <option key={ind} value={index.uid}>{index.uid}</option>
          ))
        }
      </select>
      <button type="button" onClick={deleteIndexHandler}>
        Delete
      </button>
      <div className="admin-row">
        <div className="admin-row-key">Number of Documents: </div>
        <div className="admin-row-value">{indexStats.numberOfDocuments}</div>
      </div>
      <div className="admin-row">
        <div className="admin-row-key">Atrributes: </div>
        <div className="admin-row-value">
          {Object.keys(indexStats.fieldDistribution).map((index) => ` ${index}`)}
        </div>
      </div>
      <div className="add-index">
        <input type="text" placeholder="New Index" value={addIndex} onChange={(e) => setAddIndex(e.target.value)} />
        <button type="button" onClick={addIndexHandler}>Add Index</button>
      </div>
      <div className="add-document">
        <input type="text" placeholder="New Document (JSON)" value={addDocument} onChange={(e) => setAddDocument(e.target.value)} />
        <button type="button" onClick={addDocumentHandler}>Add / Update Document</button>
      </div>
    </div>
  );
}

function AdminPage() {
  const dashboardListData = {
    defaultSelection: 0,
    listData: [
      'Stats',
      'Indexes',
    ],
  };

  const [openModal, setOpenModal] = useState(true);
  const [currentSelection, setCurrentSelection] = useState(dashboardListData.defaultSelection);

  return (
    <div className="admin">
      {openModal && <AdminModal setOpenModal={setOpenModal} />}
      <AdminDashboard
        listData={dashboardListData.listData}
        currentSelection={currentSelection}
        setCurrentSelection={setCurrentSelection}
      />
      {
        (currentSelection === 0 && <Stats />)
        || (currentSelection === 1 && <Indexes />)
      }
      <Footer />
    </div>
  );
}

export default AdminPage;
