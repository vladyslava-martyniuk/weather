import React, { useState } from 'react';
import style from './Header.module.css';
import Container from '../Container/Container';
import Modal from '../Modal/Modal';

import logoMob from '../../images/header/header_logo_mob.png';
import logoTab from '../../images/header/header_logo_tab.png';
import logoDesk from '../../images/header/header_logo_desk.png';
import UserDesk from '../../images/header/header_user_desk.png';
import UserTabAndMob from '../../images/header/header_user_tab_and_mob.png';

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Користувачі зберігаються тут, у Header
  const [users, setUsers] = useState([
    { username: "Vlad", email: "vlad@example.com", password: "123456" },
    { username: "Anna", email: "anna@example.com", password: "password" },
    { username: "John", email: "john@example.com", password: "qwerty" },
  ]);

  const handleLogout = () => {
    setIsLogged(false);
    setMobileMenuOpen(false);
  };

  const NavAuth = ({ isMobile }) => (
    <>
      <nav className={isMobile ? style.header__mobile__nav : style.header__nav}>
        <ul className={isMobile ? style.header__mobile__list : style.header__list}>
          <li className={isMobile ? style.header__mobile__item : style.header__item}>
            <a className={isMobile ? style.header__mobile__link : style.header__link} href="">
              Who we are
            </a>
          </li>
          <li className={isMobile ? style.header__mobile__item : style.header__item}>
            <a className={isMobile ? style.header__mobile__link : style.header__link} href="">
              Contacts
            </a>
          </li>
          <li className={isMobile ? style.header__mobile__item : style.header__item}>
            <a className={isMobile ? style.header__mobile__link : style.header__link} href="">
              Menu
            </a>
          </li>
        </ul>
      </nav>

      <div className={isMobile ? style.header__mobile__auth : style.header__auth}>
        {isLogged ? (
          <button
            className={isMobile ? style.header__mobile__btn : style.header__btn}
            onClick={handleLogout}
          >
            Log Out
          </button>
        ) : (
          <button
            className={isMobile ? style.header__mobile__btn : style.header__btn}
            onClick={() => setModalOpen(true)}
          >
            Sign Up
          </button>
        )}

        <picture>
          <source srcSet={UserDesk} media="(min-width: 1024px)" />
          <source srcSet={UserTabAndMob} media="(min-width: 768px)" />
          <img src={UserTabAndMob} alt="User" />
        </picture>
      </div>
    </>
  );

  return (
    <header className={style.header}>
      <Container>
        <div className={style.header__main}>
          <picture>
            <source srcSet={logoDesk} media="(min-width: 1024px)" />
            <source srcSet={logoTab} media="(min-width: 768px)" />
            <img src={logoMob} alt="Weather logo" />
          </picture>

          <NavAuth isMobile={false} />

          <div className={style.mobile__icon}>
            <p className={style.mobile__text}>Menu</p>
            <button
              className={style.mobile__btn}
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              ˅
            </button>
          </div>
        </div>
      </Container>

      {isMobileMenuOpen && (
        <div className={style.header__mobile}>
          <Container>
            <NavAuth isMobile={true} />
          </Container>
        </div>
      )}

      {isModalOpen && !isLogged && (
        <Modal
          closeModal={() => setModalOpen(false)}
          setIsLogged={setIsLogged}
          users={users}
          setUsers={setUsers}
        />
      )}
    </header>
  );
}