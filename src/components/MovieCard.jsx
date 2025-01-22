import React from 'react';
import { Link } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

const MovieCard = ({ poster, title, genres, duration, year, rating, summary, _id }) => {
    return (
        <div className="card card-side bg-base-100 shadow-xl max-w-2xl ">
            <figure>
                <img
                    src={poster}
                    alt={title}
                    className="object-cover w-48 h-[380px] rounded-lg"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="text-sm mt-4">{summary}</p>
                {/* divider next */}
                <div className="divider" />
                <div className="flex gap-2 my-2 flex-wrap">
                    {genres.map((genre, index) => (
                        <span key={index} className="badge badge-outline">
                            {genre}
                        </span>
                    ))}
                </div>

                <div className="text-sm ">
                    <span>{year}</span> • <span>{duration} min</span>
                </div>
                <div className="my-2">
                    <p>Rating : {rating}</p>
                    <Rating
                        initialValue={rating}
                        readonly
                        SVGclassName={'inline-block'}
                        size={20}
                        fillColor="#FFD700"
                        allowFraction={true}
                    />
                </div>
                <div className="card-actions justify-end">
                    <Link to={`/movies/${_id}`}>
                        <button className="btn btn-primary">See Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
