import style from "./Footer.module.css";
import Container from "../Container/Container";
import LogoDesk from "../../images/footer/footer__logo__desk.png";
import LogoTab from "../../images/footer/footer__logo__tab.png";
import InstagramDesk from "../../images/footer/footer__instagram__desk.png";
import InstagramMob from "../../images/footer/footer__instagram__mob.png";
import InstagramTab from "../../images/footer/footer__instagram__tab.png";
import FacebookDesk from "../../images/footer/footer__facebook__desk.png";
import FacebookTab from "../../images/footer/footer__facebook__tab.png";
import FacebookMob from "../../images/footer/footer__facebook__mob.png";
import WhatsappDesk from "../../images/footer/footer__whatsapp__desk.png";
import WhatsappTab from "../../images/footer/footer__whatsapp__tab.png";
import WhatsappMob from "../../images/footer/footer__whatsapp__mob.png";

export default function Footer() {
    return (
        <footer className={style.footer}>
            <Container>
                <picture>
                    <source srcSet={LogoDesk} media="(min-width: 1024px)" />
                    <source srcSet={LogoTab} media="(min-width: 768px)" />
                    <img className={style.footer__logo} src={LogoTab} alt="Logo" />
                </picture>
                <address>
                    <p className={style.address__title}>Address</p>
                    <p className={style.address__text}>
                        Svobody str. 35, Kyiv, Ukraine
                    </p>
                </address>

                <div className={style.footer__social}>
                    <ul className={style.social__list}>
                        <li className={style.social__item}>
                            <picture>
                                <source srcSet={InstagramDesk} media="(min-width: 1024px)" />
                                <source srcSet={InstagramTab} media="(min-width: 768px)" />
                                <img src={InstagramMob} alt="Instagram" />
                            </picture>
                        </li>
                        <li className={style.social__item}>
                            <picture>
                                <source srcSet={FacebookDesk} media="(min-width: 1024px)" />
                                <source srcSet={FacebookTab} media="(min-width: 768px)" />
                                <img src={FacebookMob} alt="Facebook" />
                            </picture>
                        </li>
                        <li className={style.social__item}>
                            <picture>
                                <source srcSet={WhatsappDesk} media="(min-width: 1024px)" />
                                <source srcSet={WhatsappTab} media="(min-width: 768px)" />
                                <img src={WhatsappMob} alt="Whatsapp" />
                            </picture>
                        </li>
                    </ul>
                </div>
            </Container>
        </footer>
    );
}
