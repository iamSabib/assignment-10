import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'
import MovieCard from '../components/Moviecard'

const Allmovies = () => {

    const movies = useLoaderData();
    const [rating, setRating] = useState(0);
    const handleRating = (rate) => {
        setRating(rate);
    }

    return (
        <div>
            <div className='mb-20 mt-5'>
                <h2 className="text-center text-3xl pt-10 pb-10  font-bold">All Movie</h2>
                {/* mapping the movies */}
                <div className='grid lg:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-4 lg:mx-20 md:mx-20 sm-mx-10 ' >
                    {
                        movies.map(movie => {
                            return <MovieCard key={movie._id} {...movie} />
                        })
                    }
                </div>

            </div>
        </div>
    );
};

export default Allmovies;