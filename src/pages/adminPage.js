import Navbar from '../components/navbar';
import Searchbar from '../components/searchbar';
import Footer from '../components/footer';

function AdminPage() {
  return (
    <div className="admin">
      <Navbar />
      <Searchbar />
      <Footer />
    </div>
  );
}

export default AdminPage;
