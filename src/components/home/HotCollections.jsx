import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Item from "../Item";
import Skeleton from "../UI/Skeleton";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";


const HotCollections = () => {
  const { id } = useParams();
  const [getCollection, setCollection] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchCollections = async () => {
    try {
      const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections?`
    );
    setCollection(data);
    } catch (error) {
      console.error("Error fetching collections:", error);
    } finally {
      setLoading(false);
    }
  };
   
  useEffect(() => {
    fetchCollections();
  }, []);
    
  

  const [sliderRef] = useKeenSlider({
    loop: true,
    initial: 0,
    slides: {
      origin: 'left',
      perView: 4,
      spacing: 10,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel.add);
    },
    created() {
      setLoaded(true);
    },
    breakpoints: {
      "(min-width: 600px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 4, spacing: 10 },
      },
    },
  });


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <div ref={sliderRef} className="keen-slider">
              {new Array(6).fill(0).map((_, index) => (
                <div className="keen-slider__slide" key={index}>
                  <div className="nft_wrap">
                    <Link to={``}>
                      <Skeleton width="100%" height="200px" />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to={``}>
                      <Skeleton
                        width="50px"
                        height="50px"
                        borderRadius="50%"
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="">
                      <Skeleton width="100px" height="20px" />
                    </Link>
                    <br />
                    <Skeleton width="60px" height="20px" />
                  </div>
                </div>
              ))}
            </div>
          ) : (  
            <div ref={sliderRef} className="keen-slider">
              {getCollection.length > 0 && getCollection.map((item) => (
                <div className="keen-slider__slide" key={item.id}>
                   <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details${item.nftId}`}>
                          <img src={item.nftImage} className="lazy img-fluid" alt="" />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img className="lazy pp-coll" src={item.authorImage} alt="" />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{item.title}</h4>
                        </Link>
                        <span>{item.code}</span>
                      </div>
                    </div>
                </div>    
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
        
export default HotCollections;
          
            


          
          

