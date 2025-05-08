import React from 'react';

const ModalNavigation = ({ onPrevious, onNext }) => {
  return (
    <div className="modal-navigation">
      <button 
        className="nav-button prev-button" 
        onClick={onPrevious}
        aria-label="Previous Pokemon"
      >
        <i className="bi bi-chevron-left"></i>
      </button>
      <button 
        className="nav-button next-button" 
        onClick={onNext}
        aria-label="Next Pokemon"
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
};

export default ModalNavigation; 