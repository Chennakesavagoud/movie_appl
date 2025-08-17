import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'

const diffStates = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class Upcoming extends Component {
  state = {
    status: diffStates.inProgress,
    moviesList: [],
  }

  componentDidMount = async () => {
    const API_KEY = '76a3b00b83c8438422c7b7eb425b0645'

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
      )

      if (!response.ok) {
        throw new Error('Failed to fetch upcoming movies')
      }

      const data = await response.json()

      this.setState({
        status: diffStates.success,
        moviesList: data.results,
      })
    } catch (error) {
      console.error(error)
      this.setState({status: diffStates.fail})
    }
  }

  renderSuccessView = () => {
    const {moviesList} = this.state

    return (
      <div className="movies-grid">
        {moviesList.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-rating">
              {' '}
              Rating: {movie.vote_average.toFixed(1)}
            </p>
          </Link>
        ))}
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderErrorView = () => (
    <div className="error-container">
      <h2>Failed to load upcoming movies</h2>
      <p>Please try again later.</p>
    </div>
  )

  renderDifferentViews = () => {
    const {status} = this.state
    switch (status) {
      case diffStates.inProgress:
        return this.renderLoader()
      case diffStates.success:
        return this.renderSuccessView()
      case diffStates.fail:
        return this.renderErrorView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="upcoming-container">
        <Header />
        <h1 className="page-heading">Upcoming Movies</h1>
        {this.renderDifferentViews()}
      </div>
    )
  }
}

export default Upcoming
