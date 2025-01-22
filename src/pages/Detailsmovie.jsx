import React from 'react';
import { useLoaderData } from 'react-router-dom';
import MovieCard from '../components/Moviecard';
import MovieDetails from '../components/MovieDetails';

const Detailsmovie = () => {
    const movie = useLoaderData();
    console.log(movie);
    return (
        
        <div>
            Movie Details
            <MovieDetails {...movie}></MovieDetails>
        </div>
    );
};

export default Detailsmovie;