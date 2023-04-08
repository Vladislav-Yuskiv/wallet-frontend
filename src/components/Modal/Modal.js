import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from "react-redux";


import showModal from '../../redux/modal/modalActions';

import styles from "./Modal.module.css"

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose }) {

  useEffect(() => {
    document.body.style.overflow = "hidden";
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });


  const dispatch = useDispatch();

  const toggleModal = (event) => {
    dispatch(showModal());
    document.body.style.overflow = "visible";
  };

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      toggleModal()
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      toggleModal()
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot,
  );
}


