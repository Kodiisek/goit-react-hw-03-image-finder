import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar.jsx';
import ImageGallery from './ImageGallerry.jsx';
import Button from './Button.jsx';
import Loader from './Loader.jsx';
import Modal from './Modal.jsx';
import './styles.css';

const API_KEY = '42544171-da249f8d1cbbc0c974f44b32c';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        const data = await response.json();
        if (page === 1) {
          setImages(data.hits);
        } else {
          setImages(prevImages => [...prevImages, ...data.hits]);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      fetchImages();
    }
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1); // Resetujemy stronę przy każdym nowym wyszukiwaniu
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1); // Inkrementujemy numer strony
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && <Button onClick={loadMoreImages} />} {/* Usunąłem przekazywanie query */}
      {selectedImage && <Modal imageUrl={selectedImage} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
