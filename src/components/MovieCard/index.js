import './index.css'
import {Link} from 'react-router-dom'

const MovieCard = ({movieDetails}) => {
  const {id, title, posterPath, releaseDate, voteAverage} = movieDetails
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`

  return (
    <li className="movie-card">
      <Link to={`/movie/${id}`} className="movie-link">
        <img src={imageUrl} alt={title} className="movie-poster" />
      </Link>
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-date">Release Date: {releaseDate}</p>
        <p className="movie-rating"> Rating: {voteAverage}</p>
      </div>
    </li>
  )
}

export default MovieCard
