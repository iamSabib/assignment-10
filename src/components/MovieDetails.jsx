import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Loading from './Loading';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../provider/AuthProvider';
import { useContext } from 'react';


const MovieDetails = ({ poster, title, genres, duration, year, rating, summary, _id }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthContext);

    const handleDelete = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                try {
                    const response = await fetch(`https://assignment-10-server-one-coral.vercel.app/movies/${_id}`, {
                        method: 'DELETE',
                    });
                    setIsLoading(false);
                    if (response.ok) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                            timer: 1500, // Automatically closes the alert after 1.5 seconds
                            showConfirmButton: false, // Hides the OK button
                        });
                        navigate('/allmovies'); // Navigate immediately after showing the success message
                    } else {
                        const errorData = await response.json();
                        toast.error(`Failed to delete the movie: ${errorData.message}`);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.error('Error deleting the movie:', error);
                    toast.error('Something went wrong. Please try again.');
                }
            }
        });
    };


    const handleFavorite = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://assignment-10-server-one-coral.vercel.app/addtofavorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                //body will send userEmail and movieId, user.email is the email of the logged in user
                body: JSON.stringify({ userEmail: user.email, movieId: _id }),
            });
            setIsLoading(false);
            if (response.ok) {
                Swal.fire({
                    title: "Added to Favorites!",
                    text: "Your movie has been added to favorites.",
                    icon: "success",
                    timer: 1500, // Automatically closes the alert after 1.5 seconds
                    showConfirmButton: false, // Hides the OK button
                });
            } else {
                const errorData = await response.json();
                toast.error(`Failed to add to favorites: ${errorData.message}`);
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error adding movie to favorites:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    const  handleUpdate = async () => {
        setIsLoading(true);
        await navigate(`/movies/update/${_id}`);
        setIsLoading(false);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="card card-side bg-base-100 shadow-xl mx-auto max-w-4xl">
            <figure>
                <img
                    src={poster}
                    alt={title}
                    className="object-cover w-96 h-full rounded-lg"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="text-sm mt-4">{summary}</p>
                <div className="divider" />
                <div className="flex gap-2 my-2 flex-wrap">
                    {Array.isArray(genres) && genres.map((genre, index) => (
                        <span key={index} className="badge badge-outline">
                            {genre}
                        </span>
                    ))}
                </div>

                <div className="text-sm">
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
                <div className="card-actions justify-end gap-3">
                    <button
                        className={`btn btn-accent ${isLoading ? 'loading' : ''}`}
                        onClick={handleUpdate}
                    >
                        Update Movie
                    </button>
                    <button
                        className={`btn btn-error ${isLoading ? 'loading' : ''}`}
                        onClick={handleDelete}
                    >
                        Delete Movie
                    </button>
                    <button
                        className={`btn btn-secondary ${isLoading ? 'loading' : ''}`}
                        onClick={handleFavorite}
                    >
                        Add to Favorite
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
