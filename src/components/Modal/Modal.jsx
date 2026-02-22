import React, { useState } from "react";
import style from "./Modal.module.css";
import Container from "../Container/Container";

export default function Modal({ closeModal, setIsLogged }) {
  const [isLogin, setIsLogin] = useState(false);
  const [closing, setClosing] = useState(false);

  const toggleForm = () => setIsLogin(!isLogin);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLogged(true);
    handleClose();
  };

  return (
    <div
      className={`${style.overlay} ${closing ? style.closing : style.open}`}
      onClick={handleClose}
    >
      <div
        className={`${style.modal} ${closing ? style.modalClosing : style.modalOpen}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Container>
          <div className={style.modal__main}>
            <p className={style.modal__title}>
              {isLogin ? "Log In" : "Sign Up"}
            </p>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <label className={style.modal__label}>Username</label>
                  <input className={style.modal__input} type="text" />
                </>
              )}

              <label className={style.modal__label}>E-mail</label>
              <input className={style.modal__input} type="email" />

              <label className={style.modal__label}>Password</label>
              <input className={style.modal__input} type="password" />

              <button className={style.modal__btn}>
                {isLogin ? "Log In" : "Sign Up"}
              </button>
            </form>

            <p className={style.modal__text}>
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleForm();
                }}
              >
                {isLogin ? "Sign Up" : "Log In"}
              </a>
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}