import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import CountDownTimer from "./CountDownTimer";



const NewItems = ({ item }) => {
  const [getNewItems, setNewItems] = useState([]);
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
    try {
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
      );
      setNewItems(data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setLoading(false);
    }
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
              {loading ?                 
                  new Array(7).fill(0).map((_, index) => (
                    <div className="keen-slider__slide" key={index}>
                      <div className="nft__item" >
                        <div className="author_list_pp">
                          <Link
                            to={''}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas"
                          >
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                            <img className="lazy" src={AuthorImage} alt="" />
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
                :
                  getNewItems.length > 0 &&  
                  getNewItems.map((item) => (                    
                    <div className="keen-slider__slide" key={item.id}>
                      <div className="nft__item" >
                        <div className="author_list_pp">
                          <Link to={`/author/${item.authorId}`}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="Creator: Monica Lucas">
                            <img className="lazy" src={item.authorImage} alt={item.author} />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        {item.expiryDate && (
                        <CountDownTimer expiryDate={item.expiryDate} />                      
                        )}            
                        <div className="nft__item_wrap">
                          <div className="nft__item_extra">
                            <div className="nft__item_buttons">
                              <button>Buy Now</button>
                              <div className="nft__item_share">
                                <h4>Share</h4>
                                <a 
                                  href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io" 
                                  target="_blank" 
                                  rel="noreferrer">
                                  <i className="fa fa-facebook fa-lg"></i>
                                </a>
                                <a
                                  href="https://twitter.com/intent/tweet?url=https://gigaland.io" 
                                  target="_blank" 
                                  rel="noreferrer">
                                  <i className="fa fa-twitter fa-lg"></i>
                                </a>
                                <a 
                                  href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                                  <i className="fa fa-envelope fa-lg"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                          <Link to={`/item-details/${item.nftId}`}>
                            <img
                              src={item.nftImage}
                              className="lazy nft__item_preview"
                              alt={item.title}
                            />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to={`/item-details/${item.nftId}`}>
                            <h4>{item.title}</h4>
                          </Link>
                          <div className="nft__item_price">{item.price} ETH</div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>{item.likes}</span>
                          </div>
                        </div>
                      </div>
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
