
import React, { useState } from 'react';
import Searchbar from './Searchbar.jsx';
import ImageGallery from './ImageGallerry.jsx';
import Button from './Button';
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

  const handleSearch = async () => {
    setIsLoading(true);
    setPage(1);
    try {
      const response = await fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      setImages(data.hits);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreImages = async () => {
    setIsLoading(true);
    setPage(page + 1);
    try {
      const response = await fetch(
        `https://pixabay.com/api/?q=${query}&page=${page + 1}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      setImages([...images, ...data.hits]);
    } catch (error) {
      console.error('Error fetching more images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={setQuery} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {images.length > 0 && <Button onClick={loadMoreImages} />}
      {selectedImage && <Modal imageUrl={selectedImage} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
