import s from './Footer.module.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { ReactComponent as Love } from "../../icons/love.svg";
import { ReactComponent as GitHub } from "../../icons/github.svg";
import { ReactComponent as Linkedin } from "../../icons/linkedin.svg";
import { ReactComponent as Close } from "../../icons/close.svg";
import { teamOperations, teamSelectors } from "../../redux/team";

import ModalFooter from "../ModalFooter/ModalFooter";
import  isModalFooterOpen from "../../redux/modalFooter/modalFooterActions";
import heard from "../../images/heart.svg"


export default function Footer() {
  const openModal = useSelector((state) => state.isModalFooterOpen.modalFooter);

  const dispatch = useDispatch();
  useEffect(() => dispatch(teamOperations.getDevelopers()), [dispatch]);

  const developers = useSelector(teamSelectors.getDevelopers);

  const isLoading = useSelector(teamSelectors.getIsLoading);

  function toggleModalFooter() {
    dispatch( isModalFooterOpen());
    document.body.style.overflow = "visible";
  }

  return (
    <footer className={s.footer}>
      <p className={s.copyright}>&copy; 2022 | All Rights Reserved </p>
      <div className={s.developed_by}>
        <span className={s.developed}>Developed with</span>
        {/* <Love className={s.love}/> */}
        <span className={s.favorite}>
      <svg className={s.favoriteIcon}>
       <Love className={s.love}/>
      </svg>
    </span>
        <span className={s.by}>by</span>
        <div className={s.modalClick} onClick={toggleModalFooter}>
          GoIT Students
        </div>
      </div>

       {openModal && (<ModalFooter
        className={s.team__modal}>
        
        <div className={s.team__placeholder}>
        <button className={s.btn_cross} onClick={toggleModalFooter}>
          <Close />
        </button>
        <h2 className={s.team__title}>Our team</h2>
        <span className={s.team__subtitle}>We can do a lot on our own, but together we can do everything.</span> 
          <ul className={s.team__cards}>
            {developers.map((developer) => {
              return (
                <li key={developer._id} className={s.team__item}>
                  <a className={s.team__thumb} href={developer.github}>
                    <img
                      className={s.team__img}
                      src={developer.photo}
                      alt={developer.name}
                    />
                  </a>
                  <div className={s.content_wrapper}>
                    <h4 className={s.team__name}>{developer.name}</h4>
                    <p className={s.team__description}>{developer.role}</p>
                    <div className={s.links__container}>
                    <a className={s.link_linkedin} href={developer.github}>
                      <GitHub />
                    </a>
                    <a className={s.link_github} href={developer.linkedin}>
                      <Linkedin />
                    </a>
                  </div>
                  </div>
                  
                </li>
              );
            })}
          </ul>
        </div>
        {isLoading && <Loader />}
      </ModalFooter>)}
    </footer>
  );
}
