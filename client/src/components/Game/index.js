import React from "react";
import { Link } from "react-router-dom";

function Game (item) {
    const {
        _id,
        image,
        name,
        price,
        genre
    } = item;


    return (
      <div>
        <Link to={`/products/${_id}`}>
          <img alt={name} src={`/images/${image}`}/>
          <p>{name}</p>
        </Link>
        <div>
            <ul>
                <li>

                </li>
                <li>
                    <Link to={`/products/${_id}`}>{genre}</Link>
                </li>
                <li>
                    <Link to={`/products/${_id}`}>${price}</Link>
                </li>
            </ul>
        </div>
      </div>
    );
}
  
export default Game;