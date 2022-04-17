import React, { useState } from 'react';
import '../App.css';

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;
    return (
        <>
            {props.movies.length > 0 ?
                props.movies.map((movie, index) => (
                    <>
                        <div key={movie.id} className='image-container d-flex justify-content-start m-3'>
                            <img src={movie.posterurl} alt='movie' onClick={() => props.handleMovieDetail(movie)}></img>
                            <div
                                onClick={() => props.handleFavouritesClick(movie)}
                                className='overlay d-flex align-items-center justify-content-center'
                            >
                                {<FavouriteComponent />}
                            </div>
                        </div>
                        <div>{movie.title}</div>
                    </>
                ))
                : <div className='noDataStyle'> No Data found</div>
            }
        </>
    );
};

export default MovieList;