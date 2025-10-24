import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import CountDownTimer from "./CountDownTimer";
import Item from "../Item";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCurrentSlide, setNewCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    initial: 0,
    slides: {
      origin: "left",
      perView: 4,
      spacing: 10,
    },
    slideChanged(slider) {
      setNewCurrentSlide(slider.track.details.rel.add);
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      "(min-width: 150px)": {
        slides: { perView: 1 },
      },
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(min-width: 992px)": {
        slides: { perView: 3, spacing: 5 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 4, spacing: 10 },
      },
    },
  });

  const fetchNewItems = async () => {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNewItems();
  }, []);

  function Arrow({ left, disabled, onClick }) {
    return (
      <button
        className={`arrow ${left ? "arrow-left" : "arrow-right"} ${
          disabled ? "arrow-disabled" : ""
        }`}
        onClick={onClick}
        disabled={disabled}
        aria-label={left ? "Previous slide" : "Next slide"}
      >
        {left ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M16.67 0l2.83 2.829-9.34 9.175 9.34 9.167-2.83 2.829L4.5 12z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M7.33 24l-2.83-2.829 9.34-9.175-9.34-9.167L7.33 0l12.17 12z" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <section id="section-new-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              {loading
                ? new Array(7).fill(0).map((_, index) => (
                    <div className="keen-slider__slide" key={index}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link
                            to={""}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="de_countdown">5h 30m 32s</div>
                        <Link to={``}>
                          <Skeleton width="100%" height="350px" />
                        </Link>
                        <div className="nft__item_info">
                          <Link to={``}>
                            <Skeleton width="180px" height="30px" />
                          </Link>
                          <Skeleton width="100px" height="20px" />
                        </div>
                        <div className="nft__item_like">
                          <Skeleton width="30px" height="15px" />
                        </div>
                      </div>
                    </div>
                  ))
                : items.length > 0 &&
                  items.map((item) => (
                    <div className="keen-slider__slide" key={item.id}>
                      <Item {...item} />
                    </div>
                  ))}
            </div>
            {/* Arrows */}
            {loaded && instanceRef.current && (
              <>
                <Arrow
                  left
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                  }
                  disabled={newCurrentSlide === 0}
                />

                <Arrow
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                  disabled={
                    newCurrentSlide ===
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

export default NewItems;
