import React from 'react';
import { useLoaderData } from 'react-router-dom';
import MovieCard from '../components/Moviecard';
import MoviesWatchtime from '../components/MoviesWatchtime';
import { Link } from 'react-router-dom';


const Home = () => {

    const movies = useLoaderData();
    // console.log(movies);

    return (
        <div>
            <div className="carousel w-full max-h-[900px] my-5 relative">
                <div id="slide1" className="carousel-item relative w-full">
                    <img
                        src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="w-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h2 className="text-white text-4xl md:text-6xl font-bold font-['Limelight'] tracking-wider drop-shadow-[2px_2px_8px_rgba(0,0,0,0.75)] border-4 border-white p-4">
                            Rediscover Stories
                        </h2>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img
                        src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="w-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h2 className="text-white text-4xl md:text-6xl font-bold font-['Limelight'] tracking-wider drop-shadow-[2px_2px_8px_rgba(0,0,0,0.75)] border-4 border-white p-4">
                            The Art of Cinema
                        </h2>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img
                        src="https://images.unsplash.com/photo-1598899450636-3c62c5332a35?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaW90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="w-full object-cover object-bottom" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h2 className="text-white text-4xl md:text-6xl font-bold font-['Limelight'] tracking-wider drop-shadow-[2px_2px_8px_rgba(0,0,0,0.75)] border-4 border-white p-4">
                            Feel the Frame
                        </h2>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img
                        src="https://images.unsplash.com/photo-1486693128850-a77436e7ba3c?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="w-full object-cover object-top" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <h2 className="text-white text-4xl md:text-6xl font-bold font-['Limelight'] tracking-wider drop-shadow-[2px_2px_8px_rgba(0,0,0,0.75)] border-4 border-white p-4">
                            Timeless Magic
                        </h2>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>

            {/* Feature Movie */}
            <div className=''>
                <h2 className="text-center text-3xl pt-10 pb-10  font-bold">Featured Movie</h2>
                {/* mapping the movies */}
                <div className='grid lg:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-4 lg:mx-20 md:mx-20 sm-mx-10 ' >
                    {
                        movies.map(movie => {
                            return <MovieCard key={movie._id} {...movie} />
                        })
                    }
                </div>

                <Link to='/allmovies'>
                    <button className='btn btn-primary mx-auto flex mt-10'>
                        See All Movies
                    </button>
                </Link>

            </div>

            <div className='max-w-6xl mx-auto mt-32'>
                <MoviesWatchtime></MoviesWatchtime>
            </div>

            <div className="bg-base-200 p-6 rounded-lg my-8 text-center">
                <h2 className="text-xl font-bold mb-4">Stay Updated</h2>
                <p className="mb-4">Subscribe to our newsletter for the latest movies and updates.</p>
                <form className="flex justify-center gap-2">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input input-bordered w-2/3 md:w-1/3"
                    />
                    <button className="btn btn-primary">Subscribe</button>
                </form>
            </div>


        </div>
    );
};

export default Home;
