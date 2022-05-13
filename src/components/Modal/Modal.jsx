import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ image, closeModal }) => {
  const handleBackdropCklick = e => {
    if (e.currentTarget !== e.target) {
      return;
    }

    closeModal();
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <Overlay onClick={handleBackdropCklick}>
      <ModalWindow>
        <img src={image.largeImageURL} alt={image.tags} />
      </ModalWindow>
    </Overlay>
  );
};

Modal.propTypes = {
  image: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};
