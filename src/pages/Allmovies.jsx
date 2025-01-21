import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

const Allmovies = () => {

    const [rating, setRating] = useState(0);
    const handleRating = (rate) => {
        setRating(rate);
    }

    return (
        <div>
            all movies
            <div >
                <Rating onClick={handleRating} ratingValue={rating} 
                SVGclassName={'inline-block'}/* Rating Props */ />
            </div>
        </div>
    );
};

export default Allmovies;