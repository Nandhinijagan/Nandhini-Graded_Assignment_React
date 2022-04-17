import React from "react";
import '../App.css';

function MovieDetail({ selected }) {
    const closeDetail = () => {
        window.history.back();
    }

    return (
        <section className="detail">
            <a className="close" onClick={closeDetail}>
                Back to Home
            </a>
            <hr style={{marginTop: '4%'}}/>
            <div className="content">

                <div style={{ display: 'flex' }}>
                    <img style={{ marginTop: '2%' }} src={selected.posterurl} alt="" />
                    <table style={{ marginLeft: '2%', marginTop: '2%' }}>
                        <h2 style={{ whiteSpace: 'nowrap' }} >{selected.title}({selected.year})</h2>
                        <tbody>
                            <tr>
                                <td>Imdb Rating</td>
                                <td>{selected.imdbRating}</td>
                            </tr>
                            <tr>
                                <td>Content Rating</td>
                                <td>{selected.contentRating}</td>
                            </tr>
                            <tr>
                                <td>Average Rating</td>
                                <td>{selected.imdbRating}</td>
                            </tr>
                            <tr>
                                <td>Duration</td>
                                <td>{selected.duration}</td>
                            </tr>
                            <tr>
                                <td>Genres</td>
                                <td>{selected.genres.join(', ')}</td>
                            </tr>
                            <tr>
                                <td>Actors</td>
                                <td>{selected.actors.join(', ')}</td>
                            </tr>
                            <tr>
                                <td>Release Date</td>
                                <td>{selected.releaseDate}</td>
                            </tr>
                            <tr>
                                <td>Storyline</td>
                                <td>{selected.storyline}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>
        </section>
    );
}

export default MovieDetail;
