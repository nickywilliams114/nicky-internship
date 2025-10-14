import React from 'react';
import { Link } from "react-router-dom";

const Item =({ id, title, authorImage, nftImage, nftId, authorId, code, price, likes, expiryDate}) => {
 return (
   <>
    <div>{id} key=item.id </div>
    <div>{title}</div>
    <div>{authorImage}</div>
    <div>{nftImage}</div>
    <div>{nftId}</div>
    <div>{authorId}</div>
    <div>{code}</div>
   </>
   
  );
}

export default Item;
 