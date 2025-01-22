import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const MovieDetails = ({ poster, title, genres, duration, year, rating, summary, _id }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

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
                    const response = await fetch(`/api/movies/${_id}`, {
                        method: 'DELETE',
                    });
                    setIsLoading(false);
                    if (response.ok) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        }).then(() => {
                            navigate('/all-movies');
                        });
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
            const response = await fetch(`/api/favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movieId: _id }),
            });
            setIsLoading(false);
            if (response.ok) {
                toast.success('Movie added to favorites!');
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
