import React from "react";
import CountDownTimer from '../components/home/CountDownTimer';

const Item = ({
  id,
  title,
  authorImage,
  nftImage,
  nftId,
  authorId,
  code,
  price,
  likes,
  expiryDate,
}) => {
  return (
    <div className="item-card" key={id}>
      <img src={nftImage} alt={title} className="nft-image" />
      <h3>{title}</h3>
      <p>Price: {price} ETH</p>
      <p>Likes: {likes}</p>

      {expiryDate ? (
        <CountDownTimer expiryDate={expiryDate} />
      ) : (
        <p className="no-timer"></p>
      )}
    </div>
  );
};

export default Item;
