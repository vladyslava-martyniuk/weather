import { useState } from "react";
import style from "./Slider.module.css";

import img1 from "../../images/slider/slider_mountins.jpg";
import img2 from "../../images/slider/slider_rock.jpg";
import img3 from "../../images/slider/slider_trees.jpg";
import img4 from "../../images/slider/slider_water.jpg";

export default function Slider() {
  const slides = [img1, img2, img3, img4];
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={style.slider}>
      <button onClick={prev} className={style.prev}>‹</button>

      <div className={style.track}>
        {slides.map((img, i) => {
          let position = "next";
          if (i === index) position = "active";
          if (
            i === index - 1 ||
            (index === 0 && i === slides.length - 1)
          ) {
            position = "prev";
          }

          return (
            <div key={i} className={`${style.slide} ${style[position]}`}>
              <img src={img} alt="" />
            </div>
          );
        })}
      </div>

      <button onClick={next} className={style.next}>›</button>
    </div>
  );
}
