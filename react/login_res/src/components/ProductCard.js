import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  return (
    <Card style={{ width: "100%" }}>
      <div className="sliderImge-container">
      <Card.Img variant="top" src={props.imgSrc} className="cardcategory-image"/>
      </div>
     
      <Card.Body className="slidercard-body">
        <Link to={`/CategoryView/${props._id}`} className="ellipsis2">
          <Card.Title className="categorycardtitle">
            {props.name || "Card Title"}
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
