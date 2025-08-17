import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../Header'

import CastCard from '../CastCard'

const diffStates = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}

class MovieDetails extends Component {
  state = {
    status: diffStates.inProgress,
    movieDetailsData: [],
  }

  componentDidMount = async () => {
    const API_KEY = '76a3b00b83c8438422c7b7eb425b0645'
    const {match} = this.props
    const {params} = match
    const {id} = params
    const MOVIE_ID = id
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&language=en-US`,
    )
    const responseData = await response.json()
    console.log('response data', responseData)
    const updatedData = {
      adult: responseData.adult,
      backdropPath: responseData.backdrop_path,
      genreIds: responseData.genre_ids,
      id: responseData.id,
      originalLanguage: responseData.original_language,
      originalTitle: responseData.original_title,
      overview: responseData.overview,
      popularity: responseData.popularity,
      posterPath: responseData.poster_path,
      releaseDate: responseData.release_date,
      title: responseData.title,
      video: responseData.video,
      runtime: responseData.runtime,
      voteAverage: responseData.vote_average,
      voteCount: responseData.vote_count,
      tagline: responseData.tagline,
      genres: responseData.genres,
    }
    this.setState({status: diffStates.success, movieDetailsData: updatedData})
  }

  renderSuccessView = () => {
    const {movieDetailsData} = this.state
    const {
      id,
      originalLanguage,
      originalTitle,
      overview,
      backdropPath,
      posterPath,
      releaseDate,
      title,
      video,
      runtime,
      voteAverage,
      voteCount,
      tagline,
      genres,
    } = movieDetailsData
    const imgUrl = `https://image.tmdb.org/t/p/w500/${backdropPath}`
    const imgUrlLg = `https://image.tmdb.org/t/p/w500/${posterPath}`

    return (
      <>
        <div className="movie-box">
          <div className="specific-container">
            <img className="specific-img-lg" src={imgUrlLg} alt="poster" />
            <div className="content-container">
              <h1 className="movie-name">{title}</h1>
              <p className="tag-line">{tagline}</p>
              <div className="wrapper">
                <p className="movie-rating">Rating: {voteAverage.toFixed(1)}</p>
                <p className="runtime-box">{runtime} min</p>
                <p>{releaseDate.split('-')[0]}</p>
                <p>{originalLanguage.toUpperCase()}</p>
              </div>

              <div className="genre-wrapper">
                {genres.map((genre, index) => (
                  <p key={genre.id} className="genre-name">
                    {genre.name}
                    {index < genres.length - 1 && ','}
                  </p>
                ))}
              </div>
              <h2 className="overview-heading">Overview</h2>
              <p className="description">{overview}</p>
            </div>
          </div>
        </div>

        <div className="cast-section">
          <h1 className="cast">Cast</h1>
          <CastCard id={id} />
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderDiffrentViews = () => {
    const {status} = this.state
    switch (status) {
      case diffStates.inProgress:
        return this.renderLoader()
      case diffStates.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie-details-container">
        <Header />
        {this.renderDiffrentViews()}
      </div>
    )
  }
}

export default MovieDetails
