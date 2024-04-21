import React from 'react';

const Modal = ({ imageUrl, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="Overlay" onClick={handleClose}>
      <div className="Modal">
        <img src={imageUrl} alt="Modal" />
      </div>
    </div>
  );
};

export default Modal;