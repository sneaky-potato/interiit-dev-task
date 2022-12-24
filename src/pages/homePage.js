import { useState } from 'react';
import Navbar from '../components/navbar';
import Searchbar from '../components/searchbar';
import Footer from '../components/footer';

function HomePage() {
  const [currentIndex, setCurrentIndex] = useState('links');

  return (
    <div className="home">
      <Navbar
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <Searchbar
        currentIndex={currentIndex}
      />
      <Footer />
    </div>
  );
}

export default HomePage;
