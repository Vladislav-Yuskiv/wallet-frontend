import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from "react-redux";


import showModalFooter from '../../redux/modalFooter/modalFooterActions';

import styles from "./ModalFooter.module.css"

const modalRootFooter = document.querySelector('#modal-root-footer');

export default function ModalFooter({ children, onClose }) {

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
    dispatch(showModalFooter());
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
    <div className={styles.container}>
      <div className={styles.overlay} onClick={handleBackdropClick}>
        <div className={styles.modal}>{children}</div>
      </div>
    </div>,
    modalRootFooter,
  );
}


