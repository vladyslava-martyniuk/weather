import React, { useState } from 'react';
import style from './Header.module.css';

import Container from '../Container/Container';

import logoMob from '../../images/header/header_logo_mob.png';
import logoTab from '../../images/header/header_logo_tab.png';
import logoDesk from '../../images/header/header_logo_desk.png';
import UserDesk from '../../images/header/header_user_desk.png';
import UserTabAndMob from '../../images/header/header_user_tab_and_mob.png';

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <button className={isMobile ? style.header__mobile__btn : style.header__btn}>
          Sign Up
        </button>
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
            <p className={style.mobile__icon__text}>Menu</p>
            <button
              className={style.mobile__icon__btn}
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
    </header>
  );
}
