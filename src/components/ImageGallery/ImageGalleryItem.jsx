import React from 'react';

const ImageGalleryItem = ({ image, onClick }) => {
  const handleClick = () => {
    onClick(image.largeImageURL);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        src={image.webformatURL}
        alt={image.tags}
        className="ImageGalleryItem-image"
        onClick={handleClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
