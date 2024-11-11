import React from "react";
import { Link } from "react-router-dom";
import "./CatCard.scss";

function CatCard({ card }) {
  
  return (
    <div className="catCards">
      <div className="catCard">
      <Link to={`/gigs?search=${card.title}`} >
        <img src={card.img} alt="" />
        <span className="desc">{card.desc}</span>
        <span className="title">{card.title}</span>
      </Link>

      </div>
    </div>
  );
}

export default CatCard;