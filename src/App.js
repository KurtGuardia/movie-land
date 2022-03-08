import SearchIcon from './search.svg';
import './App.css';
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=4991dfbe';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => searchMovies(searchTerm), [searchTerm]);

  useEffect(() => console.log(movies), [movies]);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const searchOneMovie = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  return (
    <div className='app'>
      <h1>MovieLand</h1>
      <div className='search'>
        <input
          type='text'
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => {
            searchOneMovie(e);
          }}
        />
        <img src={SearchIcon} alt='Search' onClick={() => {}} />
      </div>
      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie, i) => (
            <MovieCard key={i} movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>Movies not found</h2>
        </div>
      )}{' '}
    </div>
  );
}

export default App;
