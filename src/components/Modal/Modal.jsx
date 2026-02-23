import React, { useState } from "react";
import style from "./Modal.module.css";
import Container from "../Container/Container";

export default function Modal({ closeModal, setIsLogged, users, setUsers }) {
  const [isLogin, setIsLogin] = useState(false);
  const [closing, setClosing] = useState(false);
  const [error, setError] = useState("");

  const toggleForm = () => {
    setError("");
    setIsLogin(!isLogin);
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => closeModal(), 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const username = e.target.username?.value.trim();
    const password = e.target.password.value.trim();

    if (!email || !password || (!isLogin && !username)) {
      setError("Будь ласка, заповніть усі поля!");
      return;
    }

    if (isLogin) {
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) {
        setError("Невірний email або пароль!");
        return;
      }
    } else {
      const duplicate = users.find(
        (u) => u.email === email || u.username === username
      );
      if (duplicate) {
        setError("Користувач з таким email або username вже існує!");
        return;
      }

      setUsers([...users, { username, email, password }]); // додаємо нового користувача
    }

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
            <p className={style.modal__title}>{isLogin ? "Log In" : "Sign Up"}</p>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <label className={style.modal__label}>Username</label>
                  <input
                    className={style.modal__input}
                    type="text"
                    name="username"
                    required
                  />
                </>
              )}

              <label className={style.modal__label}>E-mail</label>
              <input
                className={style.modal__input}
                type="email"
                name="email"
                required
              />

              <label className={style.modal__label}>Password</label>
              <input
                className={style.modal__input}
                type="password"
                name="password"
                required
              />

              {error && <p className={style.modal__error}>{error}</p>}

              <button className={style.modal__btn}>
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
    </div>
  );
}