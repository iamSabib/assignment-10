import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';    
import { Rating } from 'react-simple-star-rating';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';
import Loading from './Loading';



const FavCard = ({ poster, title, genres, duration, year, rating, summary, _id , handleRemoveMovie}) => {

    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    
    const handleRemove = () => {
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
                try {
                    setLoading(true);
                    // Call API to delete the movie
                    const response = await fetch(`https://assignment-10-server-one-coral.vercel.app/deletefavorite/${user.email}/${_id}`, {
                        method: 'DELETE',
                    });
                    setLoading(false);
                    if (response.ok) {
                        // Remove movie from local state
                        handleRemoveMovie(_id);
    
                        // Show success message
                        Swal.fire({
                            title: "Deleted!",
                            text: "Movie has been removed from your favorites.",
                            icon: "success",
                        });
                    } else {
                        const errorData = await response.json();
                        console.error("Failed to delete movie:", errorData.message);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to remove the movie from favorites.",
                            icon: "error",
                        });
                    }
                } catch (error) {
                    console.error("Error deleting the movie:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "An unexpected error occurred. Please try again.",
                        icon: "error",
                    });
                }
            }
        });
    };
    
    if (loading) {
        return <Loading />;
    }

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
                    
                    <button className="btn btn-primary" onClick={handleRemove}>Remove Favorite</button>
                    
                </div>
            </div>
        </div>
    );
};

export default FavCard;