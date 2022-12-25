import { useState, useEffect } from 'react';
import MeiliSearch from 'meilisearch';
import AdminModal from '../components/adminModal';
import AdminDashboard from '../components/adminDashboard';
import Footer from '../components/footer';

function Stats() {
  const [stats, setStats] = useState({});
  const [version, setVersion] = useState({});

  useEffect(() => {
    const masterKey = localStorage.getItem('masterKey');
    const client = new MeiliSearch({ host: 'http://localhost:7700', apiKey: masterKey });

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

  const changeCurrentIndex = (event) => {
    setCurrentIndex(event.target.value);
  };

  useEffect(() => {
    const masterKey = localStorage.getItem('masterKey');
    const client = new MeiliSearch({ host: 'http://localhost:7700', apiKey: masterKey });

    client.getIndexes()
      .then((response) => {
        setIndices(response.results);
        setCurrentIndex(response.results[0].uid);

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
  }, [currentIndex]);

  return (
    <div className="stats admin-body">
      <div className="admin-title">
        Indexes
      </div>
      <select value={currentIndex} onChange={changeCurrentIndex}>
        {
          indices.map((index) => (
            <option value={index.uid}>{index.uid}</option>
          ))
        }
      </select>
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
    </div>
  );
}

function AdminPage() {
  const dashboardListData = {
    defaultSelection: 0,
    listData: [
      'Stats',
      'Indexes',
      'Documents',
      'Keys',
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
