import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import MovieCard from '../components/Moviecard';
import Loading from '../components/Loading';

const Allmovies = () => {
    const movies = useLoaderData(); // All movies initially loaded
    const [searchQuery, setSearchQuery] = useState(''); // User's search input
    const [searchedMovies, setSearchedMovies] = useState([]); // Movies from search
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error state

    const handleSearch = async () => {
        if (!searchQuery.trim()) return; // Ignore empty searches
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(`https://assignment-10-server-one-coral.vercel.app/searchmovies/${searchQuery}`);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }
            const data = await response.json();
            setSearchedMovies(data); // Update with search results
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div>
            <div className='mb-20 mt-5'>
                <h2 className="text-center text-3xl pt-10 pb-10 font-bold">All Movies</h2>

                {/* Search Section */}
                <div className='mx-10'>
                    <h3 className='mb-2'>Search Movies</h3>
                    <div className="input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="grow input"
                            placeholder="Search by title"
                        />
                        <button
                            onClick={handleSearch}
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>

                {/* Searched Movies */}
                {searchedMovies.length > 0 && (
                    <div className='mt-10'>
                        <h3 className="text-xl font-semibold mb-4 text-center py-10">Searched Movies</h3>
                        <div className='grid lg:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-4 lg:mx-20 md:mx-20 sm:mx-10'>
                            {searchedMovies.map(movie => (
                                <MovieCard key={movie._id} {...movie} />
                            ))}
                        </div>
                    </div>
                )}

                {/* All Movies */}
                <div className='mt-10'>
                    <h3 className="text-xl font-semibold mb-4 text-center py-10">All Movies</h3>
                    <div className='grid lg:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-4 lg:mx-20 md:mx-20 sm:mx-10'>
                        {movies.map(movie => (
                            <MovieCard key={movie._id} {...movie} />
                        ))}
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default Allmovies;
