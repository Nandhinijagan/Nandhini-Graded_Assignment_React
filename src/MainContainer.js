import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import Tabs from "./components/Tabs";
import MovieDetail from './components/MovieDetails'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const MainContainer = () => {
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [tab, setTab] = useState('movies-in-theaters');
    const [open, setOpen] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState('')

    const getMovieRequest = async (searchValue) => {
        const url = `http://localhost:3001/${tab}`;
        const response = await fetch(url);
        let responseJson = await response.json();
        let responseResults;
        if (searchValue) {
            if (tab === 'favourit') {
                responseResults = JSON.parse(
                    localStorage.getItem('react-movie-app-favourites')
                );
            } else {
                responseResults = responseJson
            }
            let result = []
            {
                responseResults.filter((val) => {
                    if (searchValue === "") {
                        result.push("No data found")
                    }
                    else if (val.title.toLowerCase().includes(searchValue.toLowerCase())) {
                        result.push(val);
                    }
                })
            }
            if (tab !== 'favourit') {
                setMovies(result);
            } else {
                setFavourites(result)
            }
        } else {
            if (tab !== 'favourit') {
                setMovies(responseJson);
            } else {
                setFavourites(JSON.parse(
                    localStorage.getItem('react-movie-app-favourites')
                ));
            }
        }
    }

    useEffect(() => {
        getMovieRequest();
    }, []);

    useEffect(() => {
        getMovieRequest(searchValue);
    }, [searchValue, tab]);

    useEffect(() => {
        const movieFavourites = JSON.parse(
            localStorage.getItem('react-movie-app-favourites')
        );
        if (movieFavourites) {
            setFavourites(movieFavourites);
        }
    }, []);

    const saveToLocalStorage = (items) => {
        localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
    };

    function search(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].title === nameKey) {
                return myArray[i];
            }
        }
    }

    const addFavouriteMovie = (movie) => {
        var resultObject = search(movie.title, favourites);
        if (favourites.length > 0) {
            if (resultObject) {
                let message = <>Error <br />Already added to favourite.</>
                toast.error(message);
            } else {
                const newFavouriteList = [...favourites, movie];
                setFavourites(newFavouriteList);
                saveToLocalStorage(newFavouriteList);
                let message = <>Success <br />Successfully added to favourite.</>
                toast.success(message)
            }
        } else {
            const newFavouriteList = [...favourites, movie];
            setFavourites(newFavouriteList);
            saveToLocalStorage(newFavouriteList);
            let message = <>Success <br />Successfully added to favourite.</>
            toast.success(message)
        }
    };

    const handleMovieDetails = (movie) => {
        setOpen(true)
        setSelectedMovie(movie)
    }

    const removeFavouriteMovie = (movie) => {
        const newFavouriteList = favourites.filter(
            (favourite) => favourite.title !== movie.title
        );
        setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
        let message = <>Success <br />Successfully removed from favourite</>
        toast.success(message)
    };

    return (
        <div className='container-fluid movie-app' >
            <div style={{ display: 'flex' }}>
                {open ? <MovieDetail selected={selectedMovie} /> :
                    <Tabs>
                        <div label="Movies in theaters" setTab={() => setTab('movies-in-theaters')} setSearchValue={setSearchValue}>
                            <div className='row d-flex align-items-center mt-4 mb-4'>
                                <MovieListHeading heading='Movies' />
                                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
                            </div>
                            <div className='row'>
                                <MovieList
                                    movies={movies}
                                    handleFavouritesClick={addFavouriteMovie}
                                    favouriteComponent={AddFavourites}
                                    handleMovieDetail={handleMovieDetails}
                                />
                            </div>
                        </div>
                        <div label="Coming soon" setTab={() => setTab('movies-coming')} setSearchValue={setSearchValue}>
                            <div className='row d-flex align-items-center mt-4 mb-4'>
                                <MovieListHeading heading='Movies' />
                                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
                            </div>
                            <div className='row'>
                                <MovieList
                                    movies={movies}
                                    handleFavouritesClick={addFavouriteMovie}
                                    favouriteComponent={AddFavourites}
                                    handleMovieDetail={handleMovieDetails}
                                />
                            </div>
                        </div>
                        <div label="Top rated indian" setTab={() => setTab('top-rated-india')} setSearchValue={setSearchValue}>
                            <div className='row d-flex align-items-center mt-4 mb-4'>
                                <MovieListHeading heading='Movies' />
                                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
                            </div>
                            <div className='row'>
                                <MovieList
                                    movies={movies}
                                    handleFavouritesClick={addFavouriteMovie}
                                    favouriteComponent={AddFavourites}
                                    handleMovieDetail={handleMovieDetails}
                                />
                            </div>
                        </div>
                        <div label="Top rated movies" setTab={() => setTab('top-rated-movies')} setSearchValue={setSearchValue}>
                            <div className='row d-flex align-items-center mt-4 mb-4'>
                                <MovieListHeading heading='Movies' />
                                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
                            </div>
                            <div className='row'>
                                <MovieList
                                    movies={movies}
                                    handleFavouritesClick={addFavouriteMovie}
                                    favouriteComponent={AddFavourites}
                                    handleMovieDetail={handleMovieDetails}
                                />
                            </div>
                        </div>
                        <div label="Favourites" setTab={() => setTab('favourit')} setSearchValue={setSearchValue}>
                            <div className='row d-flex align-items-center mt-4 mb-4'>
                                <MovieListHeading heading='Movies' />
                                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
                            </div>
                            <div className='row'>
                                <MovieList
                                    movies={favourites}
                                    handleFavouritesClick={removeFavouriteMovie}
                                    favouriteComponent={RemoveFavourites}
                                    handleMovieDetail={handleMovieDetails}
                                />
                            </div>
                        </div>
                    </Tabs>
                }
            </div>
            <ToastContainer autoClose={8000} />
        </div>
    );
};

export default MainContainer;