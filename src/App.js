import "./App.css";
import React, { useState, useEffect } from 'react';
import MainContainer from './MainContainer'
import MovieDetail from './components/MovieDetails'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

function App() {
    return (
        <MainContainer />
    );
}

export default App;