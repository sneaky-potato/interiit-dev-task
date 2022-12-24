import { useState } from 'react';
import AdminDashboard from '../components/adminDashboard';
import Footer from '../components/footer';

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

  const [currentSelection, setCurrentSelection] = useState(dashboardListData.defaultSelection);

  return (
    <div className="admin">
      <AdminDashboard
        listData={dashboardListData.listData}
        currentSelection={currentSelection}
        setCurrentSelection={setCurrentSelection}
      />
      <Footer />
    </div>
  );
}

export default AdminPage;
