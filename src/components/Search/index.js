import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'

const diffStates = {
  idle: 'IDLE',
  inProgress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class Search extends Component {
  state = {
    status: diffStates.idle,
    query: '',
    results: [],
  }

  componentDidMount() {
    const {location} = this.props
    const params = new URLSearchParams(location.search)
    const queryFromUrl = params.get('query')

    if (queryFromUrl) {
      this.setState({query: queryFromUrl}, () => {
        this.handleSearch(new Event('submit'))
      })
    }
  }

  handleInputChange = event => {
    this.setState({query: event.target.value})
  }

  handleSearch = async event => {
    event.preventDefault()
    const {query} = this.state
    if (!query.trim()) return

    const API_KEY = '76a3b00b83c8438422c7b7eb425b0645'
    this.setState({status: diffStates.inProgress})

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          query,
        )}&page=1`,
      )

      if (!response.ok) {
        throw new Error('Failed to fetch search results')
      }

      const data = await response.json()
      this.setState({
        results: data.results,
        status: diffStates.success,
      })
    } catch (error) {
      console.error(error)
      this.setState({status: diffStates.fail})
    }
  }

  renderResults = () => {
    const {results} = this.state

    if (results.length === 0) {
      return <p>No movies found.</p>
    }

    return (
      <div className="movies-grid">
        {results.map(movie => (
          <Link
            key={movie.id}
            to={`/movies/${movie.id}`}
            className="movie-card"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-rating">
              {' '}
              Rating: {movie.vote_average?.toFixed(1)}
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
      <h2>Failed to load search results</h2>
      <p>Please try again later.</p>
    </div>
  )

  renderContent = () => {
    const {status} = this.state
    switch (status) {
      case diffStates.inProgress:
        return this.renderLoader()
      case diffStates.success:
        return this.renderResults()
      case diffStates.fail:
        return this.renderErrorView()
      default:
        return null
    }
  }

  render() {
    const {query} = this.state

    return (
      <div className="search-container">
        <h1>Search Movies</h1>
        <form onSubmit={this.handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Enter movie name"
            value={query}
            onChange={this.handleInputChange}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        {this.renderContent()}
      </div>
    )
  }
}

export default Search
