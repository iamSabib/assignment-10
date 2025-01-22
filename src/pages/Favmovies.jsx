import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import FavCard from '../components/FavCard';

const Favmovies = () => {

    const loadedmovies = useLoaderData();
    const [movies, setMovies] = useState(loadedmovies);
    const handleRemoveMovie = (id) => {
        const newMovies = movies.filter(movie => movie._id !== id);
        setMovies(newMovies);
    }

    return (
        <div>
            <div className='mb-20 mt-5'>
                <h2 className="text-center text-3xl pt-10 pb-10  font-bold">Favorite Movie</h2>
               
                {/* mapping the movies */}
                <div className='grid lg:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-4 lg:mx-20 md:mx-20 sm-mx-10 ' >
                    {
                        movies.map(movie => {
                            return <FavCard key={movie._id} {...movie} handleRemoveMovie={handleRemoveMovie}/>
                        })
                    }
                </div>

            </div>
        </div>
    );
};

export default Favmovies;