import React from 'react';
import { useLoaderData } from 'react-router-dom';
import MovieCard from '../components/Moviecard';
import MovieDetails from '../components/MovieDetails';

const Detailsmovie = () => {
    const movie = useLoaderData();
    // console.log(movie);
    return (
        
        <div className='mb-32'>
            <h2 className='text-center my-10 text-3xl font-bold'>Movie Details</h2>
            <MovieDetails {...movie}></MovieDetails>
        </div>
    );
};

export default Detailsmovie;