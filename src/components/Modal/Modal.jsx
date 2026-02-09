// Modal.jsx
import React, { useState } from "react";
import style from "./Modal.module.css";
import Container from "../Container/Container";

export default function Modal({ closeModal }) {
  const [isLogin, setIsLogin] = useState(false);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className={style.modal}>
      <Container>
        <div className={style.modal__main}>
          <p className={style.modal__title}>{isLogin ? "Log In" : "Sign Up"}</p>

          <form action="">
            {!isLogin && (
              <>
                <label className={style.modal__label} htmlFor="username">
                  Username
                </label>
                <input className={style.modal__input} type="text" placeholder="Username" />
              </>
            )}
            <label className={style.modal__label} htmlFor="email">
              E-mail
            </label>
            <input className={style.modal__input} type="email" placeholder="E-mail" />

            <label className={style.modal__label} htmlFor="password">
              Password
            </label>
            <input className={style.modal__input} type="password" placeholder="Password" />

            <button className={style.modal__btn} type="submit">
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>

          <p className={style.modal__text}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
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
  );
}
