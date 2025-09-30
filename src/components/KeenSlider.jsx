import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { id } from "./Item";

const KeenSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(true);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    initial: 0,
    slides: {
      origin: "left",
      perView: 4,
      spacing: 10,
    },

    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel.add);
    },
    created() {
      setLoaded(true);
    },
  });
  

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <h2>Hot Collections</h2>
          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              <div className="keen-slider__slide ">0</div>
              <div className="keen-slider__slide number-slide2">1</div>
              <div className="keen-slider__slide number-slide3">2</div>
              <div className="keen-slider__slide number-slide4">3</div>
              <div className="keen-slider__slide number-slide5">4</div>
              <div className="keen-slider__slide number-slide6">5</div>
            </div>
             {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
              />

              <Arrow
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
              />
            </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}


export default KeenSlider;
