import React from 'react';
import CirclesWithBar from 'react-loader-spinner/dist';

const Loader = () => {
  return (
    <div className="Loader">
      <CirclesWithBar type="ThreeDots" color="#3f51b5" height={80} width={80} />
    </div>
  );
};

export default Loader;